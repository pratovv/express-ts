import {AppDataSource} from '../../config/ormconfig'
import {UserEntity} from "../entities/user-entity";
import {CreateUserDto} from "../dtos/create-user-dto";

const tokenService = require('../services/token-service');

const bcrypt = require('bcrypt')
const ApiError = require('../../exceptions/api-error');
const userRepo = AppDataSource.getRepository('UserEntity')

class UserService {
    async info(id: string) {
        return id
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token
    }

    async signin(userDto: CreateUserDto) {
        const user = await userRepo.findOne({where: {id: userDto.id}})
        if (!user) throw ApiError.BadRequest('Login or Password is incorrect') //Login is not correct
        const isPassEquals = await bcrypt.compare(userDto.password, user.password);
        if (!isPassEquals) throw ApiError.BadRequest('Login or Password is incorrect'); //Password is not correct
        const tokens = tokenService.generateTokens({id: user.id});
        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens}
    }

    async signinNewToken(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userRepo.findOne({where: {id: userData.id}});
        const tokens = tokenService.generateTokens({id: user.id});

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens}
    }

    async signup(user: CreateUserDto) {
        const isRegistered = await userRepo.findOne({where: {id: user.id}})
        if (isRegistered) throw ApiError.BadRequest(`User with id ${user.id} already exists`)
        const hashPassword = await bcrypt.hash(user.password, 3);
        const userWithChangedPass = {...user, password: hashPassword}
        await userRepo.save(userWithChangedPass);
        const tokens = tokenService.generateTokens({id: user.id});
        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens}
    }
}

module.exports = new UserService()