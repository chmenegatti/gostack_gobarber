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
      email: 'cesar@corsiarquitetura.com.br',
      name: 'Eng. Cesar - Corsi Arquitetura',
    },
  },
} as IMailConfig;
