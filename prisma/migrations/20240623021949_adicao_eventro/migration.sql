-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeEvento` VARCHAR(191) NOT NULL,
    `dataEvento` VARCHAR(191) NOT NULL,
    `horaInicio` VARCHAR(191) NOT NULL,
    `horaFim` VARCHAR(191) NOT NULL,
    `categoriaEvento` VARCHAR(191) NOT NULL,
    `localEvento` VARCHAR(191) NOT NULL,
    `descricaoEvento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
