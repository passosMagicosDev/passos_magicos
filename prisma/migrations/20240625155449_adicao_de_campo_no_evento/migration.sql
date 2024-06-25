/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `areasAtuacao` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criadorId` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeDePessoas` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeVoluntarios` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Evento` ADD COLUMN `areasAtuacao` VARCHAR(191) NOT NULL,
    ADD COLUMN `criadorId` INTEGER NOT NULL,
    ADD COLUMN `quantidadeDePessoas` INTEGER NOT NULL,
    ADD COLUMN `quantidadeVoluntarios` INTEGER NOT NULL,
    MODIFY `dataEvento` VARCHAR(191) NULL,
    MODIFY `horaInicio` VARCHAR(191) NULL,
    MODIFY `horaFim` VARCHAR(191) NULL,
    MODIFY `categoriaEvento` VARCHAR(191) NULL,
    MODIFY `localEvento` VARCHAR(191) NULL,
    MODIFY `descricaoEvento` TEXT NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Voluntario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dataNascimento` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `areaAtuacao` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NULL,
    `admin` BOOLEAN NULL,
    `empresa` BOOLEAN NOT NULL,

    UNIQUE INDEX `Voluntario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventoToVoluntario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventoId` INTEGER NOT NULL,
    `voluntarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Inscricoes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Inscricoes_AB_unique`(`A`, `B`),
    INDEX `_Inscricoes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_criadorId_fkey` FOREIGN KEY (`criadorId`) REFERENCES `Voluntario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoToVoluntario` ADD CONSTRAINT `EventoToVoluntario_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoToVoluntario` ADD CONSTRAINT `EventoToVoluntario_voluntarioId_fkey` FOREIGN KEY (`voluntarioId`) REFERENCES `Voluntario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Inscricoes` ADD CONSTRAINT `_Inscricoes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Inscricoes` ADD CONSTRAINT `_Inscricoes_B_fkey` FOREIGN KEY (`B`) REFERENCES `Voluntario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
