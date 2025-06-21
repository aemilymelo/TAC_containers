package br.edu.utfpr.api.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    private final CognitoTokenValidationInterceptor cognitoTokenValidationInterceptor;

    public InterceptorConfig(CognitoTokenValidationInterceptor cognitoTokenValidationInterceptor) {
        this.cognitoTokenValidationInterceptor = cognitoTokenValidationInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(cognitoTokenValidationInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/swagger-resources/**",
                        "/webjars/**",
                        "/v3/api-docs");
    }
}
