package com.mindhubgrupo2.hlmladorada;


import com.mindhubgrupo2.hlmladorada.Repositories.*;
import com.mindhubgrupo2.hlmladorada.models.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import static com.mindhubgrupo2.hlmladorada.models.Role.ADMIN;


@SpringBootApplication
public class HlmladoradaApplication {

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(HlmladoradaApplication.class, args);}

	@Bean
	public CommandLineRunner initData(ProductRepository productRepository,
									  CartRepository cartRepository, CartDetalsRepository cartDetalsRepository,
									  ClientStoreRepository clientStoreRepository, ClientDoubutsRepository clientDoubutsRepository,
									  EmployeeRepository employeeRepository, SalesRepository salesRepository,
									  ClientOnlineRepository clientOnlineRepository) {

			return args -> {

				Product product1 = new Product("Pecera", 15, 150, 250, 20, "15 Litros", "GluGlu", "Peceras", 15,"https://firebasestorage.googleapis.com/v0/b/challenge-935c0.appspot.com/o/Pecera_15lts.jpg?alt=media&token=ecb174eb-f242-4cdc-9467-323df292cb6c");
				Product product2 = new Product("Pecera", 15, 150, 250, 20, "5 Litros", "FishLive", "Peceras", 10,"https://firebasestorage.googleapis.com/v0/b/challenge-935c0.appspot.com/o/Pecera_15lts.jpg?alt=media&token=ecb174eb-f242-4cdc-9467-323df292cb6c");
				Product product3 = new Product("BobSponge", 15, 150, 250, 20, "Bob Sponge Figure", "Nicklodeon", "Adornos", 0,"https://firebasestorage.googleapis.com/v0/b/challenge-935c0.appspot.com/o/Bob.jpg?alt=media&token=f30ded90-2a7c-4535-a6a8-620c22335b01");
				Product product4 = new Product("Chest", 15, 150, 250, 20, "Chest to make Bubles", "Toys", "Adornos", 20,"https://firebasestorage.googleapis.com/v0/b/challenge-935c0.appspot.com/o/cofre.jpg?alt=media&token=92a79130-bb7b-4864-a33b-c0ab524c9922");
				Product product5 = new Product("WaterBomb", 15, 150, 250, 20, "Up to tanks of 15L", "TechGluGlu", "Tecnologia", 15,"https://firebasestorage.googleapis.com/v0/b/challenge-935c0.appspot.com/o/bomba.jpg?alt=media&token=638411e5-d3dd-434f-b7ee-20987e69f0a4");

				productRepository.save(product1);
				productRepository.save(product2);
				productRepository.save(product3);
				productRepository.save(product4);
				productRepository.save(product5);

				CartDetails cartDetails1 = new CartDetails(3, 15000.0);
				CartDetails cartDetails2 = new CartDetails(5, 15000.0);
				CartDetails cartDetails3 = new CartDetails(7, 15000.0);
				CartDetails cartDetails4 = new CartDetails(9, 15000.0);

				CartDetails cartDetails5 = new CartDetails(9, 15000.0);
				CartDetails cartDetails6 = new CartDetails(7, 15000.0);
				CartDetails cartDetails7 = new CartDetails(5, 15000.0);
				CartDetails cartDetails8 = new CartDetails(3, 15000.0);

				cartDetalsRepository.save(cartDetails1);
				cartDetalsRepository.save(cartDetails2);
				cartDetalsRepository.save(cartDetails3);
				cartDetalsRepository.save(cartDetails4);

				cartDetalsRepository.save(cartDetails5);
				cartDetalsRepository.save(cartDetails6);
				cartDetalsRepository.save(cartDetails7);
				cartDetalsRepository.save(cartDetails8);

				Cart cartFinal1 = new Cart();
				Cart cartFinal2 = new Cart();

				cartRepository.save(cartFinal1);
				cartRepository.save(cartFinal2);

				Sales sale1 = new Sales("Pago completado", 30000.0, List.of(PaidMethod.CREDITO), List.of(1500.0, 6000.0, 10000.0));
				Sales sale2 = new Sales("Pago completado", 60000.0, List.of(PaidMethod.DEBITO), List.of(1500.0, 6000.0, 10000.0));

				salesRepository.save(sale1);
				salesRepository.save(sale2);

				ClientOnline melba = new ClientOnline("melba", "morel", "melba@mindhub.com",
						passwordEncoder.encode("123"), "+3512311561", "Av. Olmos 435");

				ClientOnline silvia = new ClientOnline("Silvia", "Morel", "silvia@mindhub.com",
						passwordEncoder.encode("123"), "+3512311561", "Av. Olmos 500");

				ClientStore emaStore = new ClientStore("Ema", "Botta", "+651213321", "13245678", "Av. Paraíso 456");
				ClientStore ricardo = new ClientStore("Ricardo", "Gutierrez", "+849814652", "987654321", "Juan B. Justo");

				clientOnlineRepository.save(melba);
				clientOnlineRepository.save(silvia);
				clientStoreRepository.save(emaStore);
				clientStoreRepository.save(ricardo);

				ClientDoubuts deudaClient1 = new ClientDoubuts(-15000.0, "Martes 15 de Enero 2024", "Sale 1 no pagada");

				clientDoubutsRepository.save(deudaClient1);

				Employee admin = new Employee("admin", "admin", "admin@mindhub.com",
						passwordEncoder.encode("123"), ADMIN, WorkPosition.JEFE);
				Employee luigi = new Employee("Luigi", "Carrascal", "luigi@mindhub.com",
						passwordEncoder.encode("123"), ADMIN, WorkPosition.ATENCION);

				employeeRepository.save(admin);
				employeeRepository.save(luigi);

				product1.addCartDetail(cartDetails1);
				product1.addCartDetail(cartDetails2);
				product2.addCartDetail(cartDetails3);
				product2.addCartDetail(cartDetails4);
				product3.addCartDetail(cartDetails5);
				product3.addCartDetail(cartDetails6);
				product4.addCartDetail(cartDetails7);
				product5.addCartDetail(cartDetails8);

				cartFinal1.addCartDetails(cartDetails1);
				cartFinal1.addCartDetails(cartDetails2);
				cartFinal1.addCartDetails(cartDetails3);
				cartFinal1.addCartDetails(cartDetails4);

				cartFinal2.addCartDetails(cartDetails5);
				cartFinal2.addCartDetails(cartDetails6);
				cartFinal2.addCartDetails(cartDetails7);
				cartFinal2.addCartDetails(cartDetails8);

				cartFinal1.addSale(sale1);
				cartFinal2.addSale(sale2);

				luigi.addSale(sale1);
				luigi.addSale(sale2);

				melba.addCart(cartFinal1);
				silvia.addCart(cartFinal2);

				emaStore.addCarts(cartFinal2);
				emaStore.addClientDoubuts(deudaClient1);

				productRepository.save(product1);
				productRepository.save(product2);
				productRepository.save(product3);
				productRepository.save(product4);
				productRepository.save(product5);

				cartDetalsRepository.save(cartDetails1);
				cartDetalsRepository.save(cartDetails2);
				cartDetalsRepository.save(cartDetails3);
				cartDetalsRepository.save(cartDetails4);

				cartDetalsRepository.save(cartDetails5);
				cartDetalsRepository.save(cartDetails6);
				cartDetalsRepository.save(cartDetails7);
				cartDetalsRepository.save(cartDetails8);

				cartRepository.save(cartFinal1);
				cartRepository.save(cartFinal2);

				salesRepository.save(sale1);
				salesRepository.save(sale2);

				clientOnlineRepository.save(melba);
				clientOnlineRepository.save(silvia);

				clientStoreRepository.save(emaStore);
				clientDoubutsRepository.save(deudaClient1);

				employeeRepository.save(admin);
				employeeRepository.save(luigi);

				System.out.println("...... Corriendo ......");
			};
		}


}
