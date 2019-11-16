import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  > button {
      margin: 20px 0 0;
      width: 100%;
      height: 44px;
      background: #f64c75;
      color: #fff;
      font-weight: bold;
      border-radius: 4px;
      font-size: 16px;
      border: 0;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#f64c75')};
      }
    }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    hr {
      border: 0;
      background: rgba(255,255,255,0.2);
      height: 1px;
      margin: 10px 0 20px;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #ff8080;
      margin-bottom: 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      color: #fff;
      font-weight: bold;
      border-radius: 4px;
      font-size: 16px;
      border: 0;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }
`;
