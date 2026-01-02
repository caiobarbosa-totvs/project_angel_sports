var CarteiraCambio = SuperWidget
		.extend({
			//variáveis da widget
			tableCarteiraCambio : null,
			nm_cliente : null,
			instanceIdCarteiraCambio : null,

			//método iniciado quando a widget é carregada
			init : function() {
				// Armazena o ID da instância na variável da widget para uso global
				this.instanceIdCarteiraCambio = this.instanceId;
				var instanceId = this.instanceIdCarteiraCambio;

				FLUIGC.calendar('#dataInicial');
				FLUIGC.calendar('#dataFinal');

				this.calendarioCompetencia("mesInicial_" + instanceId);
				this.calendarioCompetencia("mesFinal_" + instanceId);
				this.loadClientes();
			},

			//BIND de eventos
			bindings : {
				local : {
					'consultaDados' : [ 'click_consultaDados' ],
					'clientes-sem-operacao' : [ 'click_clientesSemOperacao' ]
				},
				global : {}
			},

			consultaDados : function() {
				var self = this;
				var instanceId = this.instanceIdCarteiraCambio;
				var cpfCnpj = "";

				if ($("#cpfCnpj_" + instanceId).val() != "") {
					cpfCnpj = $("#cpfCnpj_" + instanceId).val();
				}

				var dadosSaldo = this.recuperaDadosDataset(cpfCnpj);
				dadosSaldo.then(function(dadosCarteira) {
					if (dadosCarteira) {
						self.montaTabela(dadosCarteira);
						$(".tableCarteiraCambio")
								.removeClass("fs-display-none");
						// Correção: Acessar a variável da classe
						if (self.tableCarteiraCambio) {
							self.tableCarteiraCambio.columns.adjust().draw();
						}
					}
				})["catch"](function(erro) {
					FLUIGC.toast({
						message : "Problema para recuperar os dados.",
						type : "warning"
					});
					console.error(erro);
				});
			},

			clientesSemOperacao : function() {
				var self = this;
				var dadosSaldo = this.recuperaClientesSemOperacao();
				dadosSaldo.then(function(dadosCarteira) {
					if (dadosCarteira) {
						self.montaTabela(dadosCarteira);
						$(".tableCarteiraCambio")
								.removeClass("fs-display-none");
						if (self.tableCarteiraCambio) {
							self.tableCarteiraCambio.columns.adjust().draw();
						}
					}
				})["catch"](function(erro) {
					FLUIGC.toast({
						message : "Problema para recuperar os dados.",
						type : "warning"
					});
					console.error(erro);
				});
			},

			montaTabela : function(valores) {
				var self = this;
				var colunas = [];
				var campos = [ "nomeCompleto", "dataFechamento", "moeda",
						"moedaEstrangeira", "nContrato", "taxaCliente",
						"valorTotal", "spreadEmReais", "comissao",
						"dataCadastro" ];

				for (var i = 0; i < campos.length; i++) {
					colunas.push({
						data : campos[i]
					});
				}

				var resultado = [];
				valores.forEach(function(objeto) {
					resultado.push({
						"nomeCompleto" : objeto.nomeCompleto,
						"dataFechamento" : objeto.dataFechamento,
						"moeda" : objeto.moeda,
						"moedaEstrangeira" : objeto.moedaEstrangeira,
						"nContrato" : objeto.nContrato,
						"taxaCliente" : objeto.taxaCliente,
						"valorTotal" : objeto.valorTotal,
						"spreadEmReais" : objeto.spreadEmReais,
						"comissao" : objeto.comissao,
						"dataCadastro" : objeto.dataCadastro
					});
				});

				// Inicialização do DataTable
				this.tableCarteiraCambio = $('#tableCarteiraCambio')
						.DataTable(
								{
									layout : {
										topStart : {
											buttons : [ 'colvis', {
												extend : 'excelHtml5',
												title : 'Carteira de Câmbio',
												exportOptions : {
													columns : ':visible'
												}
											}, {
												extend : 'pdfHtml5',
												title : 'Carteira de Câmbio',
												exportOptions : {
													columns : ':visible'
												}
											} ]
										}
									},
									columns : colunas,
									data : resultado,
									responsive : true,
									scrollX : true,
									order : [ [ 0, 'asc' ] ],
									"bDestroy" : true,
									autoWidth : true,
									language : {
										"sProcessing" : "Processando...",
										"sLengthMenu" : "Mostrar _MENU_ registros",
										"sZeroRecords" : "Nenhum registro encontrado",
										"sEmptyTable" : "Nenhum dado disponível para visualização",
										"sSearch" : "Buscar:",
										"oPaginate" : {
											"sNext" : "Próximo",
											"sPrevious" : "Anterior"
										},
										buttons : {
											colvis : 'Selecionar colunas'
										}
									},
									footerCallback : function(row, data, start,
											end, display) {
										var api = this.api();

										// Função auxiliar de soma compatível com ES5
										var somaColuna = function(numCol) {
											return api.column(numCol, {
												search : 'applied'
											}).data().reduce(function(a, b) {
												return a + convertToFloat(b);
											}, 0);
										};

										// Atualização dos Footers
										var total3 = somaColuna(3);
										api.column(3).footer().innerHTML = m_moeda(total3
												.toFixed(2));

										api.column(5).footer().innerHTML = ""; // Limpa coluna 5 conforme original

										var total6 = somaColuna(6);
										api.column(6).footer().innerHTML = m_moeda(total6
												.toFixed(2));

										var total7 = somaColuna(7);
										api.column(7).footer().innerHTML = m_moeda(total7
												.toFixed(2));

										var total8 = somaColuna(8);
										api.column(8).footer().innerHTML = m_moeda(total8
												.toFixed(2));
									}
								});
			},

			recuperaClientesSemOperacao : function() {
				return new Promise(
						function(resolve) {
							var loading = FLUIGC.loading(window, {
								textMessage : "Buscando dados..."
							});
							loading.show();

							DatasetFactory
									.getDataset(
											"ds_resgistrosObClientesSemCambio",
											null,
											[],
											null,
											{
												success : function(dados) {
													if (dados != null
															&& dados.values.length > 0) {
														resolve(dados.values);
													} else {
														FLUIGC
																.toast({
																	message : "Problema para recuperar os dados.",
																	type : "warning"
																});
														resolve(null);
													}
													loading.hide();
												},
												error : function(err) {
													console.log("Erro: ", err);
													FLUIGC
															.toast({
																message : "Não foi possível recuperar os dados",
																type : "danger"
															});
													loading.hide();
												}
											});
						});
			},

			recuperaDadosDataset : function(cpfCnpj) {
				return new Promise(
						function(resolve) {
							var loading = FLUIGC.loading(window, {
								textMessage : "Buscando dados..."
							});
							loading.show();

							var constraints = [];
							if (cpfCnpj != "") {
								constraints.push(DatasetFactory
										.createConstraint('cpfCnpj', cpfCnpj,
												cpfCnpj, ConstraintType.MUST));
							}

							DatasetFactory
									.getDataset(
											"DScontratoCambio",
											null,
											constraints,
											null,
											{
												success : function(dados) {
													var dataIniVal = $(
															"#dataInicial")
															.val();
													var dataFinVal = $(
															"#dataFinal").val();
													var fechamentoInical = convertToDate(dataIniVal);
													var fechamentoFinal = convertToDate(dataFinVal);

													var registros = dados.values
															.filter(function(
																	registro) {
																if (dataIniVal === ""
																		&& dataFinVal === "")
																	return true;
																var dataFechamento = convertToDate(registro.dataFechamento);

																if (dataIniVal !== ""
																		&& dataFinVal !== "") {
																	return dataFechamento >= fechamentoInical
																			&& dataFechamento <= fechamentoFinal;
																} else if (dataIniVal !== "") {
																	return dataFechamento >= fechamentoInical;
																} else {
																	return dataFechamento <= fechamentoFinal;
																}
															});

													if (registros
															&& registros.length > 0) {
														resolve(registros);
													} else {
														FLUIGC
																.toast({
																	message : "Nenhum registro encontrado para este filtro.",
																	type : "warning"
																});
														resolve(null);
													}
													loading.hide();
												},
												error : function(err) {
													FLUIGC
															.toast({
																message : "Erro ao consultar dataset.",
																type : "danger"
															});
													loading.hide();
												}
											});
						});
			},

			loadClientes : function() {
				var self = this;
				var instanceId = this.instanceIdCarteiraCambio;

				nm_cliente = FLUIGC.autocomplete(
						"#nm_cliente_" + instanceId,
						{
							maxTags : 1,
							displayKey : 'A1_NOME',
							type : 'tagAutocomplete',
							source : function(q, cb) {
								var constraints = [ DatasetFactory
										.createConstraint('A1_NOME', q
												.toLowerCase(),
												q.toLowerCase(),
												ConstraintType.MUST) ];
								self.getDatasetSync("ds_listaClientesProtheus",
										[], constraints, []).done(
										function(result) {
											cb(createAutocompleteData(result));
										});
							}
						}).on('fluig.autocomplete.selected', function(e, i) {
					$("#cpfCnpj_" + instanceId).val(i.item.A1_CGC);
				}).on('fluig.autocomplete.itemRemoved', function() {
					$("#cpfCnpj_" + instanceId).val("");
				});
			},

			getDatasetSync : function(datasetName, fields, constratins, order) {
				var url = WCMAPI.getServerURL();
				var d = $.Deferred();
				var request_data = {
					url : url + '/api/public/ecm/dataset/datasets',
					method : 'POST',
					ajaxData : JSON.stringify({
						"name" : datasetName,
						"fields" : fields || [],
						"constraints" : constratins || [],
						"order" : order || []
					})
				};
				$.ajax({
					url : request_data.url,
					type : request_data.method,
					data : request_data.ajaxData,
					contentType : "application/json"
				}).done(function(result) {
					d.resolve(result.content);
				}).fail(function() {
					d.reject();
				});
				return d;
			},

			calendarioCompetencia : function(campoMes) {
				new Pikaday({
					field : document.getElementById(campoMes),
					format : 'MM/YYYY',
					disableDayPicker : true,
					showMonths : true,
					showYears : true,
					i18n : {
						previousMonth : 'Anterior',
						nextMonth : 'Próximo',
						months : [ 'Janeiro', 'Fevereiro', 'Março', 'Abril',
								'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
								'Outubro', 'Novembro', 'Dezembro' ],
						weekdays : [ 'Domingo', 'Segunda', 'Terça', 'Quarta',
								'Quinta', 'Sexta', 'Sábado' ],
						weekdaysShort : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui',
								'Sex', 'Sáb' ]
					}
				});
			}
		});

// Funções Globais fora do Objeto
function createAutocompleteData(datasetResult) {
	var r = [];
	if (datasetResult && datasetResult.values) {
		for (var x = 0; x < datasetResult.values.length; x++) {
			r.push(datasetResult.values[x]);
		}
	}
	return r;
}

function convertToDate(dateString) {
	if (!dateString)
		return new Date(0);
	var parts = dateString.split('/');
	var date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1,
			parseInt(parts[0]));
	date.setHours(0, 0, 0, 0);
	return date;
}

function convertToFloat(str) {
	if (!str || str === "")
		return 0;
	var n = str.toString().replace(/\./g, '').replace(',', '.');
	return parseFloat(n) || 0;
}

function m_moeda(v) {
	v = v.toString().replace(/\D/g, "");
	v = v.replace(/(\d{1})(\d{8})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{5})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2");
	return v;
}