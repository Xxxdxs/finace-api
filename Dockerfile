# 使用官方 Node.js 20 镜像（Debian 基础），兼容性比 Alpine 更好，特别是对于 canvas/sharp
FROM node:20

# 设置工作目录
WORKDIR /app

# 安装 canvas 和 sharp 所需的系统依赖
# 这是一个关键步骤，因为 sharp/canvas 依赖底层 C++ 图形库
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# 设置时区为上海（这样 Cron 任务会按北京时间执行）
ENV TZ=Asia/Shanghai

# 利用 Docker 缓存层：先只复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有源代码
COPY . .

# 编译 TypeScript
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
