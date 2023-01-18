export const showList = (paymentList) =>
  paymentList
    .map(
      (payment) =>
        `${payment.name} - Название платежа, ${payment.totalAmount} - сумма платежа, <code>${payment._id}</code> - id платежа  \n`,
    )
    .join(' ');
