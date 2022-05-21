import React from 'react';
import { RecoilRoot } from 'recoil';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import { MsgPayForData } from '@models';
import Send from '.';

// ==================================
// mocks
// ==================================

jest.mock('@components', () => ({
  Name: (props) => <div id="Name" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgPayForData', () => {
  it('matches snapshot', () => {
    const message = new MsgPayForData({
      category: 'payment',
      type: 'MsgPayForData',
      signer: 'signer',
      message_namespace_id: 'message_namespace_id',
      message_size: 'message_size',
      message_share_commitment: 'message_share_commitment',
    });
    const component = renderer.create(
      <RecoilRoot>
        <MockTheme>
          <Send
            message={message}
          />
        </MockTheme>
      </RecoilRoot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
