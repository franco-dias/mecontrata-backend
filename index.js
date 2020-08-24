import app from './src/app';

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log('apllication started at port 3333');
});
