import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      `### REST API with HTTP-Only Cookie Authentication

This API uses secure HTTP-only cookies for authentication instead of Bearer tokens.

#### Authentication Flow:
1. **Login**: POST \`/api/auth/login\` with credentials
   - Sets HTTP-only cookie automatically
   - Returns user information
2. **Authenticated Requests**: Include cookies automatically
   - No need to manually add Authorization headers
   - Cookies are sent automatically with requests
3. **Logout**: POST \`/api/auth/logout\`
   - Clears the authentication cookie

#### Security Features:
- **HTTP-Only Cookies**: JavaScript cannot access authentication tokens
- **Secure by Default**: HTTPS required in production
- **CSRF Protection**: SameSite cookie attribute prevents cross-site attacks
- **Automatic Expiration**: Tokens expire based on server configuration

#### Testing in Swagger:
- Cookies are automatically handled by the browser
- No need to manually configure authentication
- Simply call the login endpoint first, then other endpoints will work

<details><summary>Detailed REST specification</summary>
<p>

**List:**
  - \`GET /<resources>/\`
    - Get the list of **<resources>** as admin
  - \`GET /user/<user_id>/<resources>/\`
    - Get the list of **<resources>** for a given **<user_id>**
    - Output a **403** if logged user is not **<user_id>**

**Detail:**
  - \`GET /<resources>/<resource_id>\`
    - Get the detail for **<resources>** of id **<resource_id>**
    - Output a **404** if not found
  - \`GET /user/<user_id>/<resources>/<resource_id>\`
    - Get the list of **<resources>** for a given **user_id**
    - Output a **404** if not found
    - Output a **403** if:
      - Logged user is not **<user_id>**
      - The **<user_id>** have no access to **<resource_id>**

**Creation / Edition / Replacement / Suppression:**
  - \`<METHOD>\` is:
    - **POST** for creation
    - **PATCH** for update (one or more fields)
    - **PUT** for replacement (all fields, not used)
    - **DELETE** for suppression (all fields, not used)
  - \`<METHOD> /<resources>/<resource_id>\`
    - Create **<resources>** with id **<resource_id>** as admin
    - Output a **400** if **<resource_id>** conflicts with existing **<resources>**
  - \`<METHOD> /user/<user_id>/<resources>/<resource_id>\`
    - Create **<resources>** with id **<resource_id>** as a given **user_id**
    - Output a **409** if **<resource_id>** conflicts with existing **<resources>**
    - Output a **403** if:
      - Logged user is not **<user_id>**
      - The **<user_id>** have no access to **<resource_id>**
</p>
</details>`,
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer token authentication (fallback for backward compatibility)',
      },
      'bearer',
    );

  if (process.env.API_VERSION) {
    documentBuilder.setVersion(process.env.API_VERSION);
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true, // Enable cookie support
    },
  });

  console.info(
    `Documentation: http://localhost:${process.env.PORT}/documentation`,
  );
}
