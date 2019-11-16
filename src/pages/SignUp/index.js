import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

// import { Container } from './styles';

import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

/** YUP VALIDATION SCHEMA */
const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  const handleSubmit = ({ name, email, password }) => {
    dispatch(signUpRequest(name, email, password));
  };

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo"></Input>
        <Input name="email" type="email" placeholder="Seu e-mail"></Input>
        <Input name="password" type="password" placeholder="Sua senha"></Input>

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login!</Link>
      </Form>
    </>
  );
}
