FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./ ./

RUN npm ci 

CMD ["lambda.handler"]