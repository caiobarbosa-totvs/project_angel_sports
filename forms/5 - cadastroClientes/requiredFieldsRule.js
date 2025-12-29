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

	requiredFields.addField("rdClienteNovoS",[INICIO, INICIO_0, TRATAR_ERRO]);	
	requiredFields.addField("catCliente",[INICIO, INICIO_0, TRATAR_ERRO]);
	
	if($("input[name='rdClienteNovo']:checked").val() == "sim"){
			
		requiredFields.addField("nomeCompleto",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("cpfCnpj",[INICIO, INICIO_0, TRATAR_ERRO]);
		
	}
	
	if($("input[name='rdClienteNovo']:checked").val() == "nao"){
		
		requiredFields.addField("zoomNomeCompleto",[INICIO, INICIO_0, TRATAR_ERRO]);	
		requiredFields.addField("zoomcpfCnpj",[INICIO, INICIO_0, TRATAR_ERRO]);
		
	}	
	
	var cpfCNPJ = verificaCPFCNPJ();
	
	if(cpfCNPJ == 11){
		
		requiredFields.addField("dataNascimento",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("numeroRg",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("dataVencRg",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("numPassaporte",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("dataVencPassaporte",[INICIO, INICIO_0, TRATAR_ERRO]);		
		
	}else if(cpfCNPJ == 14){
		
		requiredFields.addField("razaoSocial",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("cnae",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("dataAbertura",[INICIO, INICIO_0, TRATAR_ERRO]);			
		
	}						

	
	requiredFields.addField("cep",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("rua",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("bairro",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("numero",[INICIO, INICIO_0, TRATAR_ERRO]);

		requiredFields.addField("municip",[INICIO, INICIO_0, TRATAR_ERRO]);
		requiredFields.addField("uf",[INICIO, INICIO_0, TRATAR_ERRO]);
	
	requiredFields.addField("email",[INICIO, INICIO_0, TRATAR_ERRO]);

	
	requiredFields.addField("banco___",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("agencia___",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("digitoAgencia___",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("conta___",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("digitoConta___",[INICIO, INICIO_0, TRATAR_ERRO]);
	requiredFields.addField("tipoConta___",[INICIO, INICIO_0, TRATAR_ERRO]);		

	fields = requiredFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE)>= 0)
			setRequired(fields[i].name, true);
	}
}