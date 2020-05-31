import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {Account} from '../models';
import {AccountRepository, Credentials} from '../repositories';
import {AxiosService} from '../services/axios-service';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {CredentialsRequestBody} from './specs/user-controller.specs';

const MyServiceInterface = 'AxiosService';
export class AccountController {
  constructor(
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<Account, Credentials>,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
    @service(AxiosService) public axiosService: AxiosService
  ) {}

  @post('/accounts', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Account)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccount',
            exclude: ['id'],
          }),
        },
      },
    })
    account: Omit<Account, 'id'>,
  ): Promise<any> {

    if (await this.accountRepository.findOne({where: {email: account.email}})) {
      return {status: 'error', message: 'mail sent is already registered'};
    }
    // encrypt the password
    account.password = await this.passwordHasher.hashPassword(account.password);
    account.email = account.email.toLowerCase();

    const resquestBody = {email: account.email, no_password: true};
    return await this.axiosService.createCustomer(resquestBody)
      .then(response => {
        return this.accountRepository.create(account);
      })
      .catch(error => {
        return {status: 'error', error: error};
      });
  }


  // @post('/accounts/verifyAuth', {
  //   responses: {
  //     '204': {
  //       description: 'Verify auth success',
  //     },
  //   },
  // })
  // async verifyAuth(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: {
  //           type: 'object',
  //           additionalProperties: false,
  //           properties: {
  //             token: {type: 'string'}
  //           },
  //         },
  //       },
  //     },
  //   })
  //   body: any, //:  Promise<void>
  // ): Promise<any> {

  //   const verifyToken = await this.jwtService.verifyToken(body.token);
  //   if (verifyToken) {
  //     return {verifyAuth: true, message: 'token valido'}
  //   }

  // }


  @post('/accounts/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string; user: any}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    delete user.password;

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token, user};
  }

  @get('/accounts/count', {
    responses: {
      '200': {
        description: 'Account model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.count(where);
  }

  @get('/accounts', {
    responses: {
      '200': {
        description: 'Array of Account model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Account, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(Account) filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.accountRepository.find(filter);
  }

  @patch('/accounts', {
    responses: {
      '200': {
        description: 'Account PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.updateAll(account, where);
  }

  @get('/accounts/{id}', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number,
    @param.filter(Account, {exclude: 'where'}) filter?: FilterExcludingWhere<Account>
  ): Promise<Account> {
    return this.accountRepository.findById(id, filter);
  }

  @patch('/accounts/{id}', {
    responses: {
      '204': {
        description: 'Account PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    if (userId !== id) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    await this.accountRepository.updateById(id, account);
  }

  @put('/accounts/{id}', {
    responses: {
      '204': {
        description: 'Account PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number,
    @requestBody() account: Account,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    if (userId !== id) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    await this.accountRepository.replaceById(id, account);
  }

  @del('/accounts/{id}', {
    responses: {
      '204': {
        description: 'Account DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    if (userId !== id) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    await this.accountRepository.deleteById(id);
  }
}
