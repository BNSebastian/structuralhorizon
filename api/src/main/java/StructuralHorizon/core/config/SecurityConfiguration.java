package StructuralHorizon.core.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import StructuralHorizon.core.auth.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("*"));
		configuration.setAllowedMethods(List.of("*"));
		configuration.setAllowedHeaders(List.of("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(auth -> {
			/* AUTH ********************************************/
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/auth/**"))
					.permitAll();

			/* USERS ********************************************/
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/user/save"))
					.hasAuthority("ADMIN");
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/user/delete"))
					.hasAuthority("ADMIN");
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/user/update"))
					.hasAuthority("ADMIN");
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/user/**"))
					.authenticated();

			/* materials ********************************************/
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/materials/concrete/**"))
					.authenticated();

			/* TYPES ********************************************/
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/type/**"))
					.authenticated();

			/* PROJECTS ********************************************/
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/project/**"))
					.authenticated();

			/* TURBINES ********************************************/
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/turbine/**"))
					.authenticated();

			/* WARNINGS ********************************************/
			auth.requestMatchers(AntPathRequestMatcher.antMatcher("/api/warning/**"))
					.authenticated();
		});

		http.csrf(AbstractHttpConfigurer::disable);
		http.cors(Customizer.withDefaults());
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.authenticationProvider(authenticationProvider);
		http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}