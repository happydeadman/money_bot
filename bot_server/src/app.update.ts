// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
// import {
//   Action,
//   Ctx,
//   InjectBot,
//   Message,
//   On,
//   Start,
//   Update,
// } from 'nestjs-telegraf';
// import { Telegraf } from 'telegraf';
// import { actionButtons } from './app.buttons';
// import { Context } from './context.interface';
// import { showList } from './app.utils';
// import { PaymentService } from './payments/payment.service';

// const webLink = 'https://pomodoro-box-tau.vercel.app/';

// const paymentList = [
//   {
//     id: 'asdqwe11',
//     name: 'Payment',
//     owner: 'Ann',
//     amount: 12312,
//   },
//   {
//     id: 'asdqwe1sqe1',
//     name: 'GAs',
//     owner: 'Kate',
//     amount: 5644,
//   },
//   {
//     id: 'asdq123123we11',
//     name: 'Jopa',
//     owner: 'Anndrew',
//     amount: 12,
//   },
//   {
//     id: '123',
//     name: 'some',
//     owner: 'Ann',
//     amount: 12123442,
//   },
// ];

// @Update()
// export class AppUpdate {
//   constructor(
//     @InjectBot() private readonly bot: Telegraf<Context>,
//     private readonly paymentService: PaymentService,
//   ) {}

//   @Start()
//   async startCommand(ctx: Context) {
//     await ctx.reply('hello))!', {
//       reply_markup: {
//         keyboard: [[{ text: 'web app', web_app: { url: webLink } }]],
//       },
//     });
//     await ctx.reply('Что хочешь сделать?', actionButtons());
//   }
//   @Action(['list'])
//   async listPayments() {
//     const payments = await this.paymentService.getAll();
//     return await showList(payments);
//   }
//   @Action(['add'])
//   async addPayment(ctx: Context) {
//     await ctx.reply('Введи сумму и название платежа: ');
//     ctx.session.type = 'add';
//   }
//   @On('text')
//   async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
//     if (!ctx.session.type) return;

//     if (ctx.session.type === 'add') {
//       const [name, amount] = message.split('|');
//       const payment = await this.paymentService.addPayment(name, amount);
//       await ctx.reply(showList(payment));
//     }
//   }
// }
