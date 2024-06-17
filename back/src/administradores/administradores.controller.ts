import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { LoginDTO } from './dto/login.dto';
import { VerificaTokenDto } from 'src/administradores/dto/verifica-token.dto';
import { RedefineSenhaDto } from './dto/troca-senha.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) { }

  @Post()
  create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return this.administradoresService.create(createAdministradorDto);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.administradoresService.login(loginDTO);
  }

  @Get()
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administradoresService.findOne(id); //usado tipo string, para puxar pelo id do mongodb
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministradorDto: UpdateAdministradorDto) {
    return this.administradoresService.update(id, updateAdministradorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administradoresService.remove(id);
  }

  @Post('email-redefinicao')
  @HttpCode(200)
  async enviaRedefinicaoDeSenha(@Body('email') email: string) {
    return this.administradoresService.enviaTokenRedefinirSenha(email);
  }

  @Post('verifica-token')
  @HttpCode(200)
  async verificaToken(@Body() verificaTokenDto: VerificaTokenDto) {
    const { token, email } = verificaTokenDto;
    return await this.administradoresService.verificaToken(email, token);
  }

  @Post('redefine-senha')
  async trocaSenha(@Body() redefineSenhaDto: RedefineSenhaDto) {
    return await this.administradoresService.redefineSenha(redefineSenhaDto);
  }
}
