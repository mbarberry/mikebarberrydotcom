FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./ ./
COPY ./utils ./utils

RUN npm ci 

CMD ["lambda.handler"]