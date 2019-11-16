import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import AvatarInput from './AvatarInput';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const handleSubmit = data => {
    dispatch(updateProfileRequest(data));
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id"></AvatarInput>
        <Input name="name" placeholder="Nome completo"></Input>
        <Input name="email" type="email" placeholder="E-mail"></Input>
        <hr></hr>
        <Input
          name="oldPassword"
          type="password"
          placeholder="Senha atual"
        ></Input>
        <Input name="password" type="password" placeholder="Nova senha"></Input>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        ></Input>
        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
}
