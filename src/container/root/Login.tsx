/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2019-03-04
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';

import { withStyles } from '../../utils/withStyles';
import { lang } from '../../constants/zh-cn';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { warn } from '@sitb/wbs/mui/Toast';
import { FieldGroupItemProps, FormContainer } from '../../component/Form';

const styles: any = theme => ({
  root: {
    height: '100vh'
  },
  paper: {
    padding: 24,
    maxWidth: 400
  },
  content: {
    marginTop: 12,
    marginBottom: 50,
    textAlign: 'center'
  },
  binding: {
    width: '100%',
    marginTop: 24,
    marginBottom: 24
  },
  sendBtn: {
    height: 45,
    width: '35%'
  },
  loading: {
    color: '#6798e5',
    animationDuration: '550ms'
  }
});

@connect(({session}) => ({
  countDownProcessing: session.countDownProcessing,
  loginProcessing: session.loginProcessing
}))
@withStyles(styles)
@autoBind
export class Login extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      countDown: 60
    };
  }

  /**
   * 表单提交
   */
  handleSubmit(e, type) {
    console.log(e);
    const values: any = {};
    const {merchantNo, verifiedCode} = values;

    if (type === 'send') {
      // 倒计时
      let time = setInterval(() => {
        const {countDownProcessing} = this.props;
        // processing永远都为true，只有发送验证码失败才为false
        if (!countDownProcessing || this.state.countDown === 0) {
          // 解除定时器，重置倒计时
          clearInterval(time);
          this.setState({
            countDown: 60
          });
        } else {
          this.setState({
            countDown: this.state.countDown - 1
          });
        }
      }, 1000);
      getActions().session.startSend(merchantNo);
    }
    if (type === 'bind') {
      if (!verifiedCode) {
        warn('请输入您的验证码');
        return;
      }
      getActions().session.startBind({merchantNo, verifiedCode});
    }
  }

  renderSubmit(e) {
    console.log(e);
  }

  render() {
    const {classes} = this.props;
    const {countDown} = this.state;
    const fieldConfig: Array<FieldGroupItemProps> = [{
      group: [{
        fields: [{
          label: lang.merchantNo,
          name: 'merchantNo',
          required: true,
          missText: '请输入您的商户号'
        }, {
          label: lang.verifiedCode,
          name: 'verifiedCode',
          afterElement: (handleSubmit) => (
            <Button variant="contained"
                    color="primary"
                    className={classes.sendBtn}
                    onClick={handleSubmit(this.handleSubmit)}
                    disabled={countDown !== 60}
            >
              {countDown !== 60 && countDown || '发送验证码'}
            </Button>
          )
        }]
      }]
    }];

    return (
      <Grid container
            justify="center"
            alignItems="center"
            className={classes.root}
      >
        <Paper className={classes.paper}>
          <Grid className={classes.content}>
            <AccountIcon style={{fontSize: 80}}/>
            <Typography variant="h6" id="tableTitle">
              {'商户服务平台-绑定商户'}
            </Typography>
          </Grid>
          <FormContainer fieldGroups={fieldConfig}
                         unifiedVariant='standard'
                         onSubmit={this.renderSubmit}
                         layout="vertical"
                         formContainerProps={{elevation: 0}}
          />
        </Paper>
      </Grid>
    )
  }
}
