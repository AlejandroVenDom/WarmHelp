package com.tienda.app.services;

import com.tienda.app.enums.Currency;
import com.tienda.app.models.Product;
import com.tienda.app.models.User;
import com.tienda.app.repositories.ProductRepository;
import com.tienda.app.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Product createProduct(String name, String description, MultipartFile image,
                                 BigDecimal price, double tax, String currency) throws IOException {

        // Validar moneda antes de asignarla
        try {
            currency = currency.toUpperCase();
            Currency currencyEnum = Currency.valueOf(currency);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(" Moneda no válida: " + currency);
        }

        // Obtener usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println("Usuario autenticado creando producto: " + username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Convertir imagen a Base64
        String imageBase64 = image != null ? Base64.getEncoder().encodeToString(image.getBytes()) : null;

        // Crear y guardar el producto
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setImage(imageBase64);
        product.setPrice(price);
        product.setTax(tax);
        product.setCurrency(Currency.valueOf(currency));
        product.setSeller(user);

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 🔹 Obtener productos en un rango de precios
    public List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // 🔹 Obtener productos recientes (ordenados por fecha de creación)
    public List<Product> getRecentProducts() {
        return productRepository.findTop10ByOrderByCreatedAtDesc();
    }

    // 🔹 Obtener productos por tipo de moneda
    public List<Product> getProductsByCurrency(String currency) {
        return productRepository.findByCurrency(Currency.valueOf(currency.toUpperCase()));
    }

    public List<Product> getProductsBySeller(String username) {
        return productRepository.findBySellerUsername(username);
    }

    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Product updateProduct(Long id, String name, String description, MultipartFile image,
                                 BigDecimal price, double tax, String currency) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(" Producto no encontrado"));

        product.setName(name);
        product.setDescription(description);
        if (image != null && !image.isEmpty()) {
            product.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
        }
        product.setPrice(price);
        product.setTax(tax);
        product.setCurrency(Currency.valueOf(currency.toUpperCase()));

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException(" El producto no existe en la base de datos");
        }
        try {
            productRepository.deleteById(id);
            System.out.println("Producto eliminado con éxito: ID " + id);
        } catch (Exception e) {
            throw new RuntimeException(" Error al eliminar el producto: " + e.getMessage());
        }
    }
}
