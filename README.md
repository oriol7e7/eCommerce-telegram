# E-Commerce Integrat amb Telegram per a Life Club MMA

## Descripció del Projecte
E-commerce complet per a **Life Club MMA** que inclou:
- Botiga online d'equipament i roba
- Sistema d'inscripcions a classes
- Notificacions automàtiques via Telegram
- Passarel·la de pagament amb Stripe

## Funcionalitats Principals

### Integració amb Telegram
- Notificacions en temps real per:
  - Nous registres d'usuaris
  - Inscripcions completes
  - Comandes realitzades

### Botiga Online
- Catàleg de productes amb imatges i descripcions
- Sistema de carret de compra interactiu
- Pagament segur amb Stripe (mode sandbox)

### Seguretat
- Protecció contra SQL Injection
- Encriptació de contrasenyes
- Certificat SSL

## Estructura del Projecte

**Arxius principals**:
- `index.html` - Pàgina d'inici
- `.htaccess` - Configuració del servidor
- `login.php` - Sistema d'autenticació
- `register.php` - Registre d'usuaris
- `inscripcion.php` - Formulari d'inscripcions
- `cancel.php` - Pàgina de cancel·lació
- `success.php` - Confirmació de pagament
- `create-session.php` - Gestió de sessions
- `composer.json` - Dependències PHP

**Directoris**:
- `/fonts` - Tipografies personalitzades
- `/images` - Imatges del lloc web
- `/js` - Scripts JavaScript
- `/pages` - Pàgines addicionals
- `/styles` - Fulls d'estil CSS
- `/vendor` - Dependències (inclou Stripe API)

## Autors
- **Pol Guerrero González**
- **Daniel Xavier Pérez Chulca**
- **Oriol Plazas León**

**Curs**: SMX2A  
**Professors**: Abel Susín, Lina Camprubí, Fernando Rivero, Joaquim Tarinas, Joaquim Sabrià

## Llicència
Aquest projecte està sota llicència MIT. Veure [LICENSE](LICENSE) per més informació.

---

🔗 **Repositori GitHub**: [github.com/oriol7e7/ecommerce-telegram](https://github.com/oriol7e7/ecommerce-telegram)