export {default as Home} from './home'
export {default as Category} from './category'



// 根据@mand-mobile/components/src下的目录结构自动生成导出文件
<% components.forEach(com => {%>
  export {default as <%- com.camelCaseStyledName %>} from './pages/<%- com.dashedStyledName %>'
<% }) %>