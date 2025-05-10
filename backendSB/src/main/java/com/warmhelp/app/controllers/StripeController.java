package com.warmhelp.app.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.warmhelp.app.dtos.auth.StripeCheckoutRequestDTO;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stripe-pay")
@CrossOrigin("*")
public class StripeController {

    @Value("${stripe.api.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.success.url}")
    private String successUrl;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;

    @PostConstruct
    public void init(){
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String,String>> createCheckoutSession(@RequestBody StripeCheckoutRequestDTO request) throws StripeException {
        List<SessionCreateParams.LineItem> lineItems = List.of(
                SessionCreateParams.LineItem.builder()
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency(request.getCurrency())
                                        .setUnitAmount(request.getAmount())
                                        .setProductData(
                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                        .setName(request.getServiceName())
                                                        .build()
                                        )
                                        .build()
                        )
                        .setQuantity(1L).build()
        );

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl)
                .addAllLineItem(lineItems)
                .setCustomerEmail(request.getEmail())
                .build();

        Session session = Session.create(params);

        Map<String,String> respons = new HashMap<>();
        respons.put("sessionId", session.getId());
        respons.put("url", session.getUrl());

        return ResponseEntity.ok(respons);
    }

    @GetMapping("/details/{sessionId}")
    public ResponseEntity<Object> getPaymentDetails(@PathVariable String sessionId){
        try{
            Stripe.apiKey = stripeSecretKey;
            Session session = Session.retrieve(sessionId);

            Map<String, Object> response = new HashMap<>();
            response.put("id", session.getId());
            response.put("status", session.getStatus());
            response.put("payment_status", session.getPaymentStatus());
            response.put("total", session.getAmountTotal());
            response.put("customer_email", session.getCustomerEmail());

            return ResponseEntity.ok(response);
    } catch (StripeException e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al obtener los detalles del pago: " + e.getMessage());
        }
    }


}
