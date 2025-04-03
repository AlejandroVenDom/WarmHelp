package com.tienda.app.controllers;

import com.tienda.app.models.Product;
import com.tienda.app.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Crear producto con imagen (JSON Body)
    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody Map<String, Object> payload) {
        System.out.println(" Datos recibidos en el backend: " + payload);

        try {
            // Extraer datos del JSON recibido
            String name = (String) payload.get("name");
            String description = (String) payload.get("description");
            BigDecimal price = new BigDecimal(payload.get("price").toString());
            Double tax = Double.parseDouble(payload.get("tax").toString());
            String currency = (String) payload.get("currency");

            // Verifica si los datos son correctos
            System.out.println(" Creando producto: " + name + " - " + price + " " + currency);

            // Guardar producto en la BD
            Product newProduct = productService.createProduct(name, description, null, price, tax, currency);
            return ResponseEntity.ok(newProduct);
        } catch (Exception e) {
            System.err.println(" Error al procesar los datos: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    // Obtener productos de un usuario
    @GetMapping("/by-seller/{username}")
    public ResponseEntity<List<Map<String, Object>>> getProductsBySeller(@PathVariable String username) {
        System.out.println(" Buscando productos del vendedor: " + username);

        try {
            List<Product> products = productService.getProductsBySeller(username);

            // Transformamos cada producto en un mapa asegurando que los valores sean Object
            List<Map<String, Object>> productResponses = products.stream().map(product -> {
                Map<String, Object> productMap = new HashMap<>();
                productMap.put("id", product.getId());
                productMap.put("name", product.getName());
                productMap.put("description", product.getDescription());
                productMap.put("price", product.getPrice());
                productMap.put("tax", product.getTax());
                productMap.put("currency", product.getCurrency().name());
                productMap.put("image", product.getImage());
                productMap.put("sellerUsername", product.getSeller() != null ? product.getSeller().getUsername() : "Desconocido");
                return productMap;
            }).toList();

            return ResponseEntity.ok(productResponses);
        } catch (Exception e) {
            System.err.println("Error al obtener productos del vendedor: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    // Buscar productos por nombre
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String name) {
        List<Product> products = productService.searchProductsByName(name);
        return ResponseEntity.ok(products);
    }

    // Filtrar productos por rango de precios
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProductsByPrice(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        List<Product> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllProducts() {
        List<Product> products = productService.getAllProducts();

        List<Map<String, Object>> productResponses = products.stream().map(product -> {
            Map<String, Object> productMap = new HashMap<>();
            productMap.put("id", product.getId());
            productMap.put("name", product.getName());
            productMap.put("description", product.getDescription());
            productMap.put("price", product.getPrice());
            productMap.put("tax", product.getTax());
            productMap.put("currency", product.getCurrency().name());
            productMap.put("image", product.getImage());
            productMap.put("sellerUsername", product.getSeller() != null ? product.getSeller().getUsername() : "Desconocido");
            return productMap;
        }).toList();

        return ResponseEntity.ok(productResponses);
    }



    // Modificar producto
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("price") BigDecimal price,
            @RequestParam("tax") double tax,
            @RequestParam("currency") String currency
    ) throws IOException {
        Product updatedProduct = productService.updateProduct(id, name, description, image, price, tax, currency);
        return ResponseEntity.ok(updatedProduct);
    }

    // Eliminar producto
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Producto eliminado correctamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error al eliminar el producto: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se pudo eliminar el producto");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
