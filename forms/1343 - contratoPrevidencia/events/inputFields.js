function inputFields(form){
	
	if(form.getValue("rdTipoInclusao") == "proposta"){

		form.setValue("campoDescritor", "Cliente: "+form.getValue("zoomNomeCompleto")+" - "+
				"Tipo de Inclusão: Proposta")		
		
	}else if(form.getValue("rdTipoInclusao") == "anexo"){

		form.setValue("campoDescritor", "Cliente: "+form.getValue("zoomNomeCompleto")+" - "+
				"Tipo de Inclusão: Anexo")		
		
	}else if(form.getValue("rdTipoInclusao") == "saldo"){

		form.setValue("campoDescritor", "Cliente: "+form.getValue("zoomNomeCompleto")+" - "+
				"Tipo de Inclusão: Saldo")		
		
	}else if(form.getValue("rdTipoInclusao") == "comissao"){

		form.setValue("campoDescritor", "Cliente: "+form.getValue("zoomNomeCompleto")+" - "+
				"Tipo de Inclusão: Comissão")		
		
	}

	
}