import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Всего денег', 'list'),
      Markup.button.callback('Добавить', 'add'),
      Markup.button.callback('Редактировать', 'edit'),
      Markup.button.callback('Удалить', 'delete'),
    ],
    { columns: 2 },
  );
}
