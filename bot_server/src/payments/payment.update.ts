import {
  Action,
  Ctx,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { showList } from 'src/app.utils';
import { Telegraf } from 'telegraf';
import { actionButtons } from '../app.buttons';
import { Context } from '../context.interface';
import { PaymentService } from './payment.service';

const webLink = 'https://pomodoro-box-tau.vercel.app/';

@Update()
export class PaymentUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly paymentService: PaymentService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('hello))!', {
      reply_markup: {
        keyboard: [[{ text: 'web app', web_app: { url: webLink } }]],
      },
    });
    await ctx.reply('Что хочешь сделать?', actionButtons());
  }
  @Action(['list'])
  async listPayments(ctx: Context) {
    const payments = await this.paymentService.getAll();
    await ctx.replyWithHTML(showList(payments));
  }
  @Action(['add'])
  async addPayment(ctx: Context) {
    await ctx.reply('Введи сумму и название платежа: ');
    ctx.session.type = 'add';
  }
  @Action(['edit'])
  async editPayment(ctx: Context) {
    await ctx.reply('Введи ID платежа: ');
    ctx.session.type = 'edit';
  }
  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'add') {
      const [name, amount] = message.split(',');
      const payment = await this.paymentService.addPayment({
        name: name,
        amount: amount,
      });
      await ctx.replyWithHTML(
        `Название платежа: ${payment.name}, Сумма: ${payment.amount}`,
      );
    }
    if (ctx.session.type === 'edit') {
      const [id, name, amount] = message.split(',');

      try {
        const editedPayment = await this.paymentService.getById(id);

        const newPayment = await this.paymentService.update(id, {
          name: name,
          amount: amount,
        });
        await ctx.reply('Успешно отредактировано');
      } catch (err) {
        console.log(err);
        await ctx.reply('Такого ID нет');
      }
    }
  }
}
