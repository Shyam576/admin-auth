---
to:"src/modules/<%= h.fileName(name)%>/<%=h.moduleFileName(name)%>.ts"
unless_exists:true
---

<%
ModuleName = h.ModuleName(name);
fileName = h.inflection.dasherize(name);

ControllerName = h.ControllerName(name);
ControllerFileName = h.ControllerFileName(name);

ServiceName = h.ServiceName(name);
serviceFileName = h.ServiceFileName(name);

EntityName = h.EntityName(name)
entityFileName = h.entityFileName(name)

createCommandFileName = h.createCommandFileName(name);
%>import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {<%= CreateHandlerName%>} from './commands/<%= createCommandFileName%>';
import {<%= ControllerName%>} from './<%= controllerFileName%>';
import {<%= EntityName%>} from './<%= entityFileName%>';
import {<%= ServiceName%>} from './<%= serviceFileName%>';

const handlers = [
    <%= CreateHandlerName%>,
]

@Module({
    imports:[
        TypeOrmModule.forFeature([<%= EntityName%>]),
    ],
    providers:[<%= ServiceName, ...handlers%>],
    controllers:[<%= ControllerName%>],
})

export class <%=ModuleName%>{}