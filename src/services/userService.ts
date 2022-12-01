import {AppDataSource} from '../config/ormconfig'

const userRepo = AppDataSource.getRepository('UserEntity')

class UserService {
    async info() {
        const data = userRepo.findOne({
            where: {id: 1}
        })
        return data;
    }

    async logout() {
        console.log(`My info`)
        return `Hello world`
    }

    async signin() {
        console.log(`My info`)
        return `Hello world`
    }

    async signinNewToken() {
        console.log(`My info`)
        return `Hello world`
    }

    async signup() {
        console.log(`My info`)
        return `Hello world`
    }
}

module.exports = new UserService()