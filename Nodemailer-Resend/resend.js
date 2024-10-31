const { Resend } = require('resend');
const resend = new Resend('<API-KEY>');

(async function() {
  try {
    const data = await resend.emails.send({
      from: '<resend-mail>',
      to: ['<your-mail>'],
      subject: '<add-content>',
      html: '<add-content>'
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();