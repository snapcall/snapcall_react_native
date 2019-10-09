jest.mock('react-native-snapcall');

import 'react-native';
import React from 'react';
import App from '../App';

import rns from 'react-native-snapcall';

const hangupMock = rns.mocks.hangup;
const app = new App();
describe('easyTest', () => {

  test('hangup', ()=> {
      app.hangup();
      expect(hangupMock).toHaveBeenCalledTimes(1);
  });
});
