export const CorsConfig = {
  origin: '*', // 允许的源
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  exposedHeaders: 'Authorization',
  credentials: true,
  maxAge: 3600,
};
