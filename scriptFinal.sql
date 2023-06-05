create database if not exists sprint3;
use sprint3;

create table if not exists empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
cnpj char(18) not null unique,
cep char(9)
);

insert into empresa values
(null, 'MASP', '123456789123456789', '01214-120');

  create table if not exists usuario(
idUsuario int primary key auto_increment,
nome varchar(50),
sobrenome varchar(50),
dtNasc date,
cpf char(14),
cidade varchar(45),
cep char(9),
email varchar(50),
senha char(8),
fkEmpresa int,
constraint foreign key  (fkEmpresa) references empresa(idEmpresa)
);

insert into usuario values
(null, 'fernando', 'brandão', '1977-08-23', '123.456.789-61', 'São Paulo', '01214-120', 'fernando.brandao@sptech.school', '1234567', 1);

create table if not exists sala(
idSala int primary key auto_increment,
andar varchar(4),
sala varchar(20),
fkEmpresaSala int,
constraint foreign key (fkEmpresaSala) references empresa(idEmpresa)
);

insert into sala values
(null, '1', 'A', 1),
(null, '1', 'B', 1),
(null, '1', 'C', 1);

create table if not exists quadrante(
idQuadrante int primary key auto_increment,
nome varchar(50),
status varchar(11),
fkSala int,
constraint foreign key (fkSala) references sala(idSala),
constraint chkStatus check (status IN ('Ativo', 'Inativo', 'Manutenção'))
);

insert into quadrante values
(null, 'revolução francesa', 'Ativo', 1),
(null, 'egito', 'Manutenção', 2),
(null, 'obras famosas', 'Inativo', 3),
(null, 'medieval', 'Ativo', 2);

create table if not exists registro(
idRegistro int auto_increment,
temperatura double,
umidade double,
dtHora datetime,
fkQuadrante int,
constraint foreign key (fkQuadrante) references quadrante(idQuadrante),
constraint primary key (idRegistro,fkQuadrante)
);

insert into registro values
(1, '20', '60', now(), 1),
(2, '16', '62', now(), 2),
(3, '12', '48', now(), 3),
(4, '10', '44', now(), 4);

select * from empresa;
select * from usuario;
select * from sala;
select * from quadrante;
select * from registro;

update registro set temperatura = 24
	where idRegistro = 2;


    

