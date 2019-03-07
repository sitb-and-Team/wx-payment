/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2019/2/21
 */
import * as React from 'react';
import { autoBind } from "veigar/autoBind";
import { TableConstant } from "../../component/Table";
import { FormContainer } from '../../component/Form';
import { searchTradeRefund } from './config/searchTradeRefund';
import { columnsTradeRefund } from './config/columnsTradeRefund';

@autoBind
export class TradeRefund extends React.Component<any, any> {

  onSubmit(e) {
    console.log(e);
  }

  render() {

    return (
      <React.Fragment>
        <FormContainer fieldGroups={searchTradeRefund}
                       formSubmitProcessing={false}
                       onSubmit={this.onSubmit}
        />
        <TableConstant dataResource={[]}
                       columns={columnsTradeRefund}
                       tableTitle="交易退款"
                       selection={{type: 'checkbox'}}
        />
      </React.Fragment>
    );
  }
}
