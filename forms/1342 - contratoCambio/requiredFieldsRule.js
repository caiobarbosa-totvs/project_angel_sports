/**
 * Carrega regra de campos obrigatórios
 * @returns void.
 */
function requiredFieldsRule(){
	$("<style>").prop("type", "text/css")
		.html("\
			.required::before{\
				content: '*';\
				color: red;\
			}").appendTo("head");
	$('label').removeClass('required');
	requiredFields = new Fields();
	var fields = [];

	requiredFields.addField("rdTipoInclusaoOrdem",[INICIO, INICIO_0]);
	requiredFields.addField("notifWhatsapp",[INICIO, INICIO_0]);	

	
	if ($("input[name='rdTipoInclusao']:checked").val() == 'anexo') {

    	requiredFields.addField("zoomNomeCompleto",[INICIO, INICIO_0]);
    	requiredFields.addField("zoomcpfCnpj",[INICIO, INICIO_0]);		
		
	}
	

    if ($("input[name='rdTipoInclusao']:checked").val() == 'fechamento') {
    	requiredFields.addField("zoomEmpresaProtheus",[INICIO, INICIO_0]);
    	requiredFields.addField("zoomreferencia",[INICIO, INICIO_0]);
    	requiredFields.addField("tipoOperacao",[INICIO, INICIO_0]);
    	requiredFields.addField("zoomOperadora",[INICIO, INICIO_0]);
    	requiredFields.addField("moedaEstrangeira",[INICIO, INICIO_0]);  
    	requiredFields.addField("dataCredito",[INICIO, INICIO_0]);
    	requiredFields.addField("dataFechamento",[INICIO, INICIO_0]);
    	requiredFields.addField("taxaCliente",[INICIO, INICIO_0]);
    	requiredFields.addField("taxaSpot",[INICIO, INICIO_0]);
    	requiredFields.addField("despesaBanc",[INICIO, INICIO_0]);
    	requiredFields.addField("iof",[INICIO, INICIO_0]);
    	requiredFields.addField("spreadUtilizado",[INICIO, INICIO_0]);
    }
    
    if ($("input[name='rdTipoInclusao']:checked").val() == 'ordem') {
    	
    	requiredFields.addField("zoomEmpresaProtheus",[INICIO, INICIO_0]);
    	requiredFields.addField("zoomNomeCompleto",[INICIO, INICIO_0]);
    	requiredFields.addField("zoomcpfCnpj",[INICIO, INICIO_0]);    	
		requiredFields.addField("referencia",[INICIO, INICIO_0]);				
		requiredFields.addField("zoomMoeda",[INICIO, INICIO_0]);
		requiredFields.addField("moedaEstrangeira",[INICIO, INICIO_0]); 
		requiredFields.addField("dataCredito",[INICIO, INICIO_0]);
    	
    	requiredFields.addField("zoomOperadora",[FECHAMENTO]);
    	requiredFields.addField("tipoOperacao",[FECHAMENTO]);
    	requiredFields.addField("moedaEstrangeira",[FECHAMENTO]);
    	requiredFields.addField("dataFechamento",[FECHAMENTO]);
    	requiredFields.addField("taxaCliente",[FECHAMENTO]);
    	requiredFields.addField("taxaSpot",[FECHAMENTO]);
    	requiredFields.addField("despesaBanc",[FECHAMENTO]);
    	requiredFields.addField("iof",[FECHAMENTO]);
    	requiredFields.addField("spreadUtilizado",[FECHAMENTO]);    	
    	
    }
    
	requiredFields.addField("comissao",[COMISSAO]);

	fields = requiredFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE)>= 0)
			setRequired(fields[i].name, true);
	}
}