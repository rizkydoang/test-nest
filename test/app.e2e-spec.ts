import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { AuthDto } from 'src/auth/dto'

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    await app.init()
    await app.listen(3000)

    prisma = app.get(PrismaService)
    await prisma.cleanDB()
    pactum.request.setBaseUrl('http://127.0.0.1:3000')
  })

  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'rizkydoang@gmail.com',
      password: 'rizkydoang'
    }

    describe('Signup', () => {
      it('should throw error if no body', () => {
        return pactum.spec().post('/auth/signup')
        .expectStatus(400)
      })

      it('should throw error if empty email', () => {
        return pactum.spec().post('/auth/signup')
        .withBody({
          password: dto.password
        }).expectStatus(400)
      })

      it('should throw error if empty password', () => {
        return pactum.spec().post('/auth/signup')
        .withBody({
          email: dto.email
        }).expectStatus(400)
      })

      it('should signup', () => {
        return pactum.spec().post('/auth/signup')
        .withBody(dto).expectStatus(201)
      })
    })

    describe('Signin', () => {
      it('should throw error if no body', () => {
        return pactum.spec().post('/auth/signin')
        .expectStatus(400)
      })

      it('should throw error if empty email', () => {
        return pactum.spec().post('/auth/signin')
        .withBody({
          password: dto.password
        }).expectStatus(400)
      })

      it('should throw error if empty password', () => {
        return pactum.spec().post('/auth/signin')
        .withBody({
          email: dto.email
        }).expectStatus(400)
      })

      it('should signin', () => {
        return pactum.spec().post('/auth/signin')
        .withBody(dto).expectStatus(200)
      })
    })
  })

  describe('User', () => {
    describe('Get Me', () => {
      it.todo('should get me')
    })
    describe('Edit User', () => {
      it.todo('should edit user')
    })
  })

  describe('Bookmark', () => {
    describe('Create Bookmark', () => {
      it.todo('should create bookmark')
    })
    describe('Get Bookmark', () => {
      it.todo('should get bookmark')
    })
    describe('Get Bookmark By ID', () => {
      it.todo('should get bookmark by id')
    })
    describe('Edit Bookmark', () => {
      it.todo('should edit bookmark')
    })
    describe('Delete Bookmark', () => {
      it.todo('should delete bookmark')
    })
  })
})