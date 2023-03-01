-- CreateTable
CREATE TABLE "datas" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "children" INTEGER NOT NULL,
    "smoker" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "datas_pkey" PRIMARY KEY ("id")
);
