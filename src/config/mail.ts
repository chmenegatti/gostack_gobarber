interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@cesarmenegatti.com',
      name: 'Eng. Cesar Menegatti',
    },
  },
} as IMailConfig;
