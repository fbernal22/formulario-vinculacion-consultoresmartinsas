import React, { useState, useEffect } from "react";
import "./App.css";
import { Tooltip } from "react-tooltip";
import logo from "./assets/logo.png";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://formulario-vinculacion-consultoresmartinsas.vercel.app/";

// Datos de países, departamentos y ciudades
const data = {
  Paises: {
    Afganistan: {},
    Albania: {},
    Alemania: {},
    Angola: {},
    "Arabia Saudita": {},
    Argelia: {},
    Argentina: {},
    Armenia: {},
    Australia: {},
    Austria: {},
    Azerbaiyan: {},
    Bahamas: {},
    Bahréin: {},
    Bangladesh: {},
    Barbados: {},
    Belgica: {},
    Benin: {},
    Bielorrusia: {},
    Birmania: {},
    Bolivia: {},
    "Bosnia And Herzegovina": {},
    Botsuana: {},
    Brasil: {},
    "Brunei Darussalam": {},
    Bulgaria: {},
    "Burkina Faso": {},
    Burundi: {},
    Bután: {},
    "Cabo Verde": {},
    Camboya: {},
    Camerun: {},
    Canada: {},
    Chad: {},
    Chequia: {},
    Chile: {},
    China: {},
    Chipre: {},
    Comoras: {},
    Congo: {},
    "Corea Del Norte": {},
    "Corea Del Sur": {},
    "Costa De Marfil": {},
    "Costa Rica": {},
    Croacia: {},
    Cuba: {},
    Dinamarca: {},
    Dominica: {},
    Ecuador: {},
    Egipto: {},
    "El Salvador": {},
    "Emiratos Árabes Unidos": {},
    Eritrea: {},
    Eslovaquia: {},
    Eslovenia: {},
    España: {},
    "Estados Unidos De América": {},
    Estonia: {},
    Esuatini: {},
    Etiopía: {},
    Filipinas: {},
    Finlandia: {},
    Francia: {},
    Gabon: {},
    Gambia: {},
    Geornia: {},
    Ghana: {},
    Gibraltar: {},
    Granada: {},
    Grecia: {},
    Guatemala: {},
    Guinea: {},
    "Guinea Bissau": {},
    "Guinea Ecuatorial": {},
    Guyana: {},
    Haiti: {},
    Honduras: {},
    "Hong Kong": {},
    Hungría: {},
    India: {},
    Indonesia: {},
    Iran: {},
    Iraq: {},
    Irlanda: {},
    Islandia: {},
    "Islas Caiman": {},
    "Islas Solomón": {},
    Israel: {},
    Italia: {},
    Jamaica: {},
    Japon: {},
    Jordania: {},
    Katar: {},
    Kazasjtán: {},
    Kenia: {},
    Kirgustan: {},
    Kosovo: {},
    Kuwait: {},
    Laos: {},
    Lesoto: {},
    Letonia: {},
    Libano: {},
    Liberia: {},
    Libia: {},
    Lituania: {},
    Luxemburgo: {},
    "Macedonia Del Norte": {},
    Madagascar: {},
    Malasia: {},
    Malaui: {},
    Maldivas: {},
    Mali: {},
    Malta: {},
    Marruecos: {},
    Mauricio: {},
    Mauritania: {},
    Mexico: {
      departamentos: {
        Jalisco: ["Guadalajara", "Zapopan", "Tlaquepaque"],
        "Nuevo León": ["Monterrey", "San Nicolás", "Guadalupe"],
      },
    },
    Moldovia: {},
    Mongolia: {},
    Montenegro: {},
    Mozambique: {},
    Myanmar: {},
    Namibia: {},
    Nepal: {},
    Nicaragua: {},
    Nigeria: {},
    Niguer: {},
    Noruega: {},
    "Nueva Guinea": {},
    "Nueva Zelanda": {},
    Omán: {},
    "Países Bajos": {},
    Pakistan: {},
    Panama: {},
    Paraguay: {},
    Peru: {},
    Polonia: {},
    Portugal: {},
    "Reino Unido": {},
    "Republica Centroafricana": {},
    "Republica Democratica Del Congo": {},
    "Republica Dominicana": {},
    Ruanda: {},
    Rumania: {},
    Rusia: {},
    "San Vicente Y Las Granadinas": {},
    "Santa Lucia": {},
    "Santo Tomé Y Príncipe": {},
    Senegal: {},
    Serbia: {},
    Seychelles: {},
    "Sierra Leona": {},
    Singapur: {},
    Siria: {},
    Somalia: {},
    "Sri Lanka": {},
    Sudáfrica: {},
    Sudan: {},
    "Sudan Del Sur": {},
    Suecia: {},
    Suiza: {},
    Suriname: {},
    Tailandia: {},
    Taiwán: {},
    Tanzania: {},
    Tayikistan: {},
    "Timor-Leste": {},
    Togo: {},
    "Trinidad Y Tobajo": {},
    Túnez: {},
    Turkmenistan: {},
    Turquia: {},
    Ucrania: {},
    Uganda: {},
    Uruguay: {},
    Uzbekistan: {},
    Vanuatu: {},
    Venezuela: {},
    Vietnam: {},
    Yemen: {},
    Yibuti: {},
    Zambia: {},
    Zimbabue: {},
  },
  Colombia: {
    departamentos: {
      Amazonas: [],
      Antioquia: [],
      Arauca: [],
      Atlántico: [],
      "Bogotá, D. C.": [],
      Bolívar: [],
      Boyacá: [],
      Caldas: [],
      Caquetá: [],
      Casanare: [],
      Cauca: [],
      Cesar: [],
      Chocó: [],
      Córdoba: [],
      Cundinamarca: [],
      Guainía: [],
      Guaviare: [],
      Huila: [],
      "La Guajira": [],
      Magdalena: [],
      Meta: [],
      Nariño: [],
      "Norte de Santander": [],
      Putumayo: [],
      Quindío: [],
      Risaralda: [],
      "San Andrés y Providencia": [],
      Santander: [],
      Sucre: [],
      Tolima: [],
      "Valle del Cauca": [],
      Vaupés: [],
      Vichada: [],
    },
  },
  Argentina: {
    departamentos: {
      "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca"],
      Córdoba: ["Córdoba", "Villa Carlos Paz", "Río Cuarto"],
    },
  },
};


async function enviarCorreo(destinatario, asunto, mensaje) {
  try {
    const response = await fetch("/enviar-correo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinatario, asunto, mensaje })
    });

      if (!response.ok) {
          throw new Error(`Error en el envío: ${response.statusText}`);
      }

      console.log(`Correo enviado a ${destinatario}`);
  } catch (error) {
      console.error("Error enviando correo:", error);
  }
}

const generateTransactionId = () => {
  const timestamp = Date.now().toString().slice(-6); // Últimos 6 dígitos del timestamp
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Número aleatorio de 4 dígitos
  return `TX-${timestamp}-${randomNum}`; // Formato: TX-123456-7890
};


const App = () => {

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fechadediligenciamiento:"",
    Contraparte:"",
    tipodecontraparte:"",
    Proceso:"",
    tipopersona: "",
    nombreCompleto: "",
    razonsocial: "",
    tipoDocumento: "",
    numeroDocumento: "",
    numeronit: "",
    nombreCompletorl: "",
    tipoDocumentorl: "",
    numeroDocumentorl: "",
    descripcionrelacioncomercial: "",
    tipodeidentificaciondesociedad: "",
    fechaconstitucion: "",
    fechaExpedicion: "",
    paisExpedicion: "",
    departamentoExpedicion: "",
    ciudadExpedicion: "",
    fechaNacimiento: "",
    paisNacimiento: "",
    departamentoNacimiento: "",
    ciudadNacimiento: "",
    nacionalidad: "",
    estadoCivil: "",
    genero: "",
    telefonoFijo: "",
    telefonoCelular: "",
    correoElectronico: "",
    direccionResidencia: "",
    paisResidencia: "",
    departamentoResidencia: "",
    ciudadResidencia: "",
    actividadEconomica: "",
    ingresosMensuales: "",
    recibeotrosingresos: "",
    Valorotrosingresos: "",
    descrpcionotrosingresos: "",
    egresosMensuales: "",
    activos: "",
    pasivos: "",
    patrimonioNeto: "",
    origenFondos: "",
    esPEP: "",
    nombredelpep: "",
    parentescoPEP: "",
    cargoPEP: "",
    paisdelpep: "",
    sujetoaretencion: "",
    agenteretenedor: "",
    resolucionautoretenedor: "",
    responsableiva: "",
    grancontribuyente: "",
    contribuyenterenta: "",
    agenteretenedorica: "",
    autoretenedor: "",
    rendimientosfinancieros: "",
    comision: "",
    entidadfinancieradepagos: "",
    numerodecuenta: "",
    plazodepagos: "",
    productosfinancierosextranjeros: "",
    indicarcual: "",
    transaccionesenelextranjero: "",
    indiquecual1: "",
    responsabilidadfiscal: "",
    pais: "",
    numeroNIT: "",
    tipoDocumentopep: "",
    numeroDocumentopep: "",
    fechadevinculacioncargo: "",
    fechadedesvinculacioncargo: "",
    paisResidenciaFiscal: "",
    nombreentidad: "",
    fechaUltimaDeclaracion: "",
    nombrerefcom: "",
    cargorefcom: "",
    telefonoCelularrefcom: "",
    correoElectronicorefcom: "",
    datosfinancieros: "",
    nombrereffin: "",
    cargoreffin: "",
    fideicomitentepat: "",
    correoElectronicoreffin: "",
    telefonoCelularreffin: "",
    EntidadFiduciaria: "",
    entidadpublica: "",
    aceptaTerminos: false,
    autorizaConsultas: false,
    declaraVeracidad: false,
    declaracionpep: false,
  });

  const [errores, setErrores] = useState({});

  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  const [numAccionistasPN, setNumAccionistasPN] = useState(0);
  const [accionistasPN, setAccionistasPN] = useState([]);
  const [numAccionistasPJ, setNumAccionistasPJ] = useState(0);
  const [accionistasPJ, setAccionistasPJ] = useState([]);

  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    setTransactionId(generateTransactionId());
  }, []);

  const verificarDocumento = () => {
    if (formData.numeroDocumento && formData.numeroDocumento.startsWith("1032")) {
      alert("Número de documento no permitido.");
  }
    return true;
  };
  // Si el número es válido, continuar con el proceso normal
  alert("✅ Formulario enviado correctamente.");
  console.log("✅ Número de documento válido, continuando con el envío...");



  const opcionesTipoContraparte = {
    Accionista: ["Accionista"],
    Cliente: ["Cliente - Retail", "Cliente - Liquidador"],
    Proveedor: [
      "Proveedor de Mercancía - Nacional",
      "Proveedor de Mercancía - Internacional",
      "Proveedor de Marketing - Nacional",
      "Proveedor de Marketing - Internacional",
      "Proveedor de Compras Internas - Nacional",
      "Proveedor de Compras Internas - Internacional",
    ],
  };

  const enviarFormulario = async (e) => {
    e.preventDefault(); // Evita el envío automático del formulario

        if (!formData || !formData.numeroDocumento) {

            alert("Por favor, ingrese su número de documento.");
            return;
        }

        try {
            const response = await axios.post(API_URL, formData);
            if (response.status === 201) {
                alert("✅ Proceso finalizado exitosamente.");
            } else {
                alert("⚠️ Hubo un problema al guardar los datos.");
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("❌ Ocurrió un error al enviar el formulario.");
        }
    };


  const [vinculaciones, setVinculaciones] = useState([]);
    useEffect(() => {
      axios
        .get(API_URL)
        .then(response => {
          setVinculaciones(response.data);
        })
        .catch(error => {
          console.error("Error al obtener los datos:", error);
        });
    }, []);

  const sections = [
    "Información Inicial",
    "Información Basico",
    "Composición Accionaria",
    "Información Financiera",
    "Declaración de Impuestos",
    "Información de PEP",
    "Información de Comercial",
    "Autorizaciones y Consentimientos",
  ];

  const handleChange = (e) => {
    
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "Contraparte" ? { tipodecontraparte: "" } : {}), // Reset tipo de contraparte si cambia Contraparte
    }));

    
    
    if (name === "paisNacimiento") {
      const departamentosData = data[value]?.departamentos || {};
      setDepartamentos(Object.keys(departamentosData));
      setCiudades([]);
    }

    if (name === "departamentoNacimiento") {
      const ciudadesData =
        data[formData.paisNacimiento]?.departamentos[value] || [];
      setCiudades(ciudadesData);
    }

    if (name === "paisExpedicion") {
      const departamentosData = data[value]?.departamentos || {};
      setDepartamentos(Object.keys(departamentosData));
      setCiudades([]);
    }

    if (name === "departamentoExpedicion") {
      const ciudadesData =
        data[formData.paisExpedicion]?.departamentos[value] || [];
      setCiudades(ciudadesData);
    }

    if (name === "paisResidencia") {
      const departamentosData = data[value]?.departamentos || {};
      setDepartamentos(Object.keys(departamentosData));
      setCiudades([]);
    }

    if (name === "departamentoResidencia") {
      const ciudadesData =
        data[formData.paisResidencia]?.departamentos[value] || [];
      setCiudades(ciudadesData);
    }
  };

  const validarSeccionActual = () => {
    let erroresTemp = {};
  
    // 🔹 Validación Sección 1: Información Inicial
    if (step === 0) {
      if (!formData.fechadediligenciamiento) {
        erroresTemp.fechadediligenciamiento = "Ingrese la fecha de diligenciamiento";
      }
      if (!formData.Contraparte) {
        erroresTemp.Contraparte = "Seleccione una contraparte";
      }
      if (!formData.tipodecontraparte) {
        erroresTemp.tipodecontraparte = "Seleccione el tipo de contraparte";
      }
      if (!formData.Proceso) {
        erroresTemp.Proceso = "Seleccione un proceso";
      }
    }

    if (step === 1) {
      if (!formData.tipoPersona) {
        erroresTemp.tipoPersona = "Seleccione el tipo de persona";
      }
  
      // 🔹 Validaciones para Persona Natural (PN)
      if (formData.tipoPersona === "PN") {
        if (!formData.nombreCompleto.trim()) {
          erroresTemp.nombreCompleto = "Ingrese su nombre completo";
        }
        if (!formData.tipoDocumento) {
          erroresTemp.tipoDocumento = "Seleccione el tipo de documento";
        }
        if (!formData.numeroDocumento.trim()) {
          erroresTemp.numeroDocumento = "Ingrese el número de documento";
        }
        if (!formData.fechaNacimiento) {
          erroresTemp.fechaNacimiento = "Ingrese su fecha de nacimiento";
        }
        if (!formData.paisNacimiento) {
          erroresTemp.paisNacimiento = "Seleccione su país de nacimiento";
        }
        if (formData.paisNacimiento === "Colombia" && !formData.departamentoNacimiento) {
          erroresTemp.departamentoNacimiento = "Seleccione su departamento de nacimiento";
        }
        if (!formData.ciudadNacimiento.trim()) {
          erroresTemp.ciudadNacimiento = "Ingrese su ciudad de nacimiento";
        }
        if (!formData.fechaExpedicion) {
          erroresTemp.fechaExpedicion = "Ingrese la fecha de expedición de su documento";
        }
        if (!formData.paisExpedicion) {
          erroresTemp.paisExpedicion = "Seleccione el país de expedición";
        }
        if (formData.paisExpedicion === "Colombia" && !formData.departamentoExpedicion) {
          erroresTemp.departamentoExpedicion = "Seleccione el departamento de expedición";
        }
        if (!formData.ciudadExpedicion.trim()) {
          erroresTemp.ciudadExpedicion = "Ingrese la ciudad de expedición";
        }
      }
  
      // 🔹 Validaciones para Persona Jurídica (PJ)
      if (formData.tipoPersona === "PJ") {
        if (!formData.razonSocial.trim()) {
          erroresTemp.razonSocial = "Ingrese la razón social";
        }
        if (!formData.tipoDocumento) {
          erroresTemp.tipoDocumento = "Seleccione el tipo de documento";
        }
        if (!formData.numeroNIT.trim()) {
          erroresTemp.numeroNIT = "Ingrese el número NIT";
        }
        if (!formData.nombreCompletorl.trim()) {
          erroresTemp.nombreCompletorl = "Ingrese el nombre del representante legal";
        }
        if (!formData.tipoDocumentorl) {
          erroresTemp.tipoDocumentorl = "Seleccione el tipo de documento del representante";
        }
        if (!formData.numeroDocumentorl.trim()) {
          erroresTemp.numeroDocumentorl = "Ingrese el número de documento del representante";
        }
        if (!formData.descripcionrelacioncomercial.trim()) {
          erroresTemp.descripcionrelacioncomercial = "Describa la relación comercial";
        }
        if (!formData.fechaConstitucion) {
          erroresTemp.fechaConstitucion = "Ingrese la fecha de constitución";
        }
      }
    }

    if (step === 2) {
      if (!formData.telefonoCelular) {
        erroresTemp.telefonoCelular = "Ingrese el Telefono Celular";
      }
      if (!formData.correoElectronico) {
        erroresTemp.correoElectronico = "Ingrese el Correo Electronico";
      }
      if (!formData.direccionResidencia) {
        erroresTemp.direccionResidencia = "Ingrese la Direccion de Residencia";
      }
      if (!formData.paisResidencia) {
        erroresTemp.paisResidencia = "Seleccione el País";
      }
      if (!formData.departamentoResidencia) {
        erroresTemp.departamentoResidencia = "Seleccione el Departamento";
      }
      if (!formData.ciudadResidencia) {
        erroresTemp.ciudadResidencia = "Seleccione la Ciudad";
      }
    }    
    
    if (step === 3) {
      if (!formData.actividadEconomica) {
        erroresTemp.actividadEconomica = "Seleccione su Actividad Economica";
      }
      if (!formData.ingresosMensuales) {
        erroresTemp.ingresosMensuales = "Ingrese sus Ingresos Mensuales";
      }
      if (!formData.recibeotrosingresos) {
        erroresTemp.recibeotrosingresos = "Seleccione si Recibe otros Ingresos";
      }
      if (!formData.egresosMensuales) {
        erroresTemp.egresosMensuales = "Ingrese sus Egresos Mensuales";
      }
      if (!formData.activos) {
        erroresTemp.activos = "Ingrese sus Activos";
      }
      if (!formData.pasivos) {
        erroresTemp.pasivos = "Ingrese sus Pasivo";
      }
      if (!formData.origenFondos) {
        erroresTemp.origenFondos = "Ingrese el origen de los Fondos";
      }      
    }   
    
    if (step === 4) {
      if (!formData.sujetoaretencion) {
        erroresTemp.sujetoaretencion = "Seleccione si es o no Sujeto a Retencion";
      }
      if (!formData.productosfinancierosextranjeros) {
        erroresTemp.productosfinancierosextranjeros = "Seleccione si cuenta o no con Productos Financieros en el Extranjero";
      }
      if (!formData.transaccionesenelextranjero) {
        erroresTemp.transaccionesenelextranjero = "Seleccione si cuenta o no con Transacciones en el Extranjero";
      }
      if (!formData.responsabilidadfiscal) {
        erroresTemp.responsabilidadfiscal = "Seleccione si cuenta o no con Responsabilidad Fiscal";
      }
   
    }   
    
    if (step === 5) {
      if (!formData.esPEP) {
        erroresTemp.esPEP = "Seleccione si es o no una Persona Expuesta Politicamente";
      }
   
    }     

    if (step === 6) {
      if (!formData.aceptaTerminos) {
        erroresTemp.aceptaTerminos = "Seleccionar si Acepta Terminos y Condiciones";
      }
      if (!formData.autorizaConsultas) {
        erroresTemp.autorizaConsultas = "Seleccionar si Autoriza las consultas a Cetrales de Riesgos";
      }
      if (!formData.declaraVeracidad) {
        erroresTemp.declaraVeracidad = "Seleccionar si la Informacion Suministrada es Veraz";
      }
   
    }       
        
  
    // Si hay errores, los guardamos y evitamos avanzar
    if (Object.keys(erroresTemp).length > 0) {
      setErrores(erroresTemp);
      return false;
    }
  
    // Si todo está completo, se permite avanzar
    setErrores({});
    return true;
  };   
  
  const avanzarSeccion = () => {
      console.log("Paso actual antes de validación:", step);
      console.log("Número de Accionistas PN:", numAccionistasPN);
      console.log("Número de Accionistas PJ:", numAccionistasPJ);

      if (step === 2) {
          if (numAccionistasPN <= 0 && numAccionistasPJ <= 0) {
              alert("Debe haber al menos un accionista (Persona Natural o Jurídica).");
              return;
          }

          const totalParticipacionPN = accionistasPN.reduce((sum, accionista) => sum + (parseFloat(accionista.participacion) || 0), 0);
          const totalParticipacionPJ = accionistasPJ.reduce((sum, accionista) => sum + (parseFloat(accionista.participacionpj) || 0), 0);
          const totalParticipacion = totalParticipacionPN + totalParticipacionPJ;

          console.log("Total Participación PN:", totalParticipacionPN);
          console.log("Total Participación PJ:", totalParticipacionPJ);
          console.log("Total Participación General:", totalParticipacion);

          if (totalParticipacion !== 100) {
              alert("La suma total de Participación Accionaria debe ser exactamente 100%.");
              return;
          }
      }

      if (step === 1) {
          if (formData.tipoPersona === "PJ") {
              console.log("Cambiando a Sección 2 (Accionistas PJ)");
              setStep(2);
          } else if (formData.tipoPersona === "PN") {
              console.log("Cambiando directamente a Sección 3 (Información Financiera)");
              setStep(3);
          }
      } else if (step === 2) {
          console.log("Validación correcta. Cambiando a Sección 3 (Información Financiera)");
          setStep((prevStep) => prevStep + 1);  // <--- Cambio importante
      } else {
          setStep((prevStep) => prevStep + 1);
      }

      setTimeout(() => {
          console.log("Paso actual después de intentar avanzar:", step);
      }, 500);
  };

  const validarNumeroDocumento = (tipoDocumento, valor) => {
    if (tipoDocumento === "Pasaporte") {
      return valor; // Permitir alfanumérico
    } else {
      return valor.replace(/\D/g, ""); // Permitir solo números
    }
  };



  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.numeroDocumento) {
        alert("Por favor, ingrese su número de documento.");
        return;
    }

    const numeroDocumento = formData?.numeroDocumento || "Desconocido";

    try {
        await enviarCorreo(formData.correoElectronico, "Proceso Finalizado", "Tu proceso de vinculación ha sido completado con éxito.");
        await enviarCorreo("fabernal9722@gmail.com", "Nuevo Registro Completado", 
            `El usuario con número de documento ${numeroDocumento} ha finalizado el proceso.`);
        console.log("📧 Correos de confirmación enviados correctamente");
    } catch (error) {
        console.error("❌ Error enviando correos de confirmación:", error);
    }
    

    try {
        await enviarCorreo("fabernal9722@gmail.com", "Intento bloqueado", 
            `Se ha intentado registrar un número de documento bloqueado: ${numeroDocumento}.`);
        console.log("📧 Correo de alerta enviado correctamente");
    } catch (error) {
        console.error("❌ Error enviando correo de alerta:", error);
    }

    console.log("🚀 handleSubmit se ejecutó correctamente!"); // Debugging

    alert("Formulario enviado correctamente.");
  };


  const handleFinancialChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/\D/g, ""); // Elimina caracteres no numéricos
    const numericValue = parseInt(rawValue || 0); // Convierte a número
  
    // Nuevo objeto de estado con el valor actualizado
    const updatedFormData = { ...formData, [name]: `$ ${numericValue.toLocaleString("es-CO")}` };
  
    // Si el campo actualizado es "activos" o "pasivos", recalcula patrimonio
    if (name === "activos" || name === "pasivos") {
      const activos = parseInt(updatedFormData.activos.replace(/\D/g, "")) || 0;
      const pasivos = parseInt(updatedFormData.pasivos.replace(/\D/g, "")) || 0;
      updatedFormData.patrimonioNeto = `$ ${(activos - pasivos).toLocaleString("es-CO")}`;
    }
  
    setFormData(updatedFormData);
  };

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100; // 🔹 Cálculo dinámico del progreso

  

  return (
    
    <div className="form-container">

      <div className="top-bar">
      <img src={logo} alt="Logo Consultoría" className="form-logo" />
        <h1></h1>

        <div className="progress-wrapper">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
          <span className="transaction-id">{transactionId}</span>
        </div>
        <span className="vinculacion-text">Proceso de Concocimineto</span>
      </div>
      <div className="form-header">
      <h2>{sections[step]}</h2>
      </div>
      <form onSubmit={handleSubmit}>

        {/* Sección 1: Información Inicial */}
        {step === 0 && (
        <>
          <label>
            Fecha de Diligenciamiento*<span data-tooltip-id="tooltip-fecha" className="tooltip-icon"> ℹ️ </span>
          </label>
          <input
            type="date"
            name="fechadediligenciamiento"
            value={formData.fechadediligenciamiento}
            onChange={handleChange}
            required
          />
          {errores.fechadediligenciamiento && (
            <span style={{ color: "red", fontSize: "12px", marginBottom: "20px", display: "block" }}>
              {errores.fechadediligenciamiento}
            </span>
          )}
          <Tooltip id="tooltip-fecha" place="top" effect="solid">
            Se debe relacionar la fecha de diligenciamiento de este formulario
          </Tooltip>

          <label>
            Contraparte* <span data-tooltip-id="tooltip-contraparte" className="tooltip-icon"> ℹ️ </span>
          </label>
          <select name="Contraparte" value={formData.Contraparte} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="Accionista">Accionista</option>
            <option value="Cliente">Cliente</option>
            <option value="Proveedor">Proveedor</option>
          </select>
          {errores.Contraparte && (
            <span style={{ color: "red", fontSize: "12px", marginBottom: "20px", display: "block" }}>
              {errores.Contraparte}
            </span>
          )}
          <Tooltip id="tooltip-contraparte" place="top" effect="solid">
            Se debe relacionar la contraparte a la que pertenezca
          </Tooltip>

          <label>
            Tipo de Contraparte* <span data-tooltip-id="tooltip-tipodecontraparte" className="tooltip-icon"> ℹ️ </span>
          </label>
          <select name="tipodecontraparte" value={formData.tipodecontraparte} onChange={handleChange} required>
            <option value="">Seleccione</option>
            {opcionesTipoContraparte[formData.Contraparte]?.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
          {errores.tipodecontraparte && (
            <span style={{ color: "red", fontSize: "12px", marginBottom: "20px", display: "block" }}>
              {errores.tipodecontraparte}
            </span>
          )}
          <Tooltip id="tooltip-tipodecontraparte" place="top" effect="solid">
            Se debe relacionar el tipo de la contraparte a la que pertenezca.
          </Tooltip>

          <label>
            Proceso* <span data-tooltip-id="tooltip-Proceso" className="tooltip-icon"> ℹ️ </span>
          </label>
          <select name="Proceso" value={formData.Proceso} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="Vinculacion">Vinculacion</option>
            <option value="Actualizacion">Actualizacion</option>
            <option value="Cesión">Cesión</option>
            <option value="Fusión">Fusión</option>
            <option value="Escisión">Escisión</option>
          </select>
          {errores.Proceso && (
            <span style={{ color: "red", fontSize: "12px", marginBottom: "20px", display: "block" }}>
              {errores.Proceso}
            </span>
          )}
          <Tooltip id="tooltip-Proceso" place="top" effect="solid">
            Por favor seleccione el proceso que va a realizar.
          </Tooltip>
        </>
      )}

        {/* Sección 1: Información Basica */}
        {step === 1 && (
          <>
          
         
            <label>Tipo de Persona*<span data-tooltip-id="tooltip-tipoPersona" className="tooltip-icon" > ℹ️ </span>  </label>
            <select
              name="tipoPersona"
              value={formData.tipoPersona}
              onChange={(e) => {
                const tipoPersona = e.target.value;
                setFormData({
                  ...formData,
                  tipoPersona,
                  tipoDocumento: tipoPersona === "PJ" ? "NIT" : "",
                  razonSocial: tipoPersona === "PJ" ? "" : formData.razonSocial,
                  numeroNIT: tipoPersona === "PJ" ? "" : formData.numeroNIT,
                  fechaConstitucion: tipoPersona === "PJ" ? "" : formData.fechaConstitucion,
                });


              }}
              required
            >
              <option value="">Seleccione</option>
              <option value="PN">Persona Natural</option>
              <option value="PJ">Persona Jurídica</option>
            </select>
            {errores.tipoPersona && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.tipoPersona}</span>)}            
            <Tooltip id="tooltip-tipoPersona" place="top" effect="solid"> Por favor seleccione El tipo de Persona si es una persona Natural o una persona Juridica. </Tooltip> 


              
            {/* Campos para Persona Natural */}
            {formData.tipoPersona === "PN" && (
              <>

       
                <label htmlFor="nombreCompleto">Nombre Completo *<span data-tooltip-id="tooltip-nombreCompleto" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  id="nombreCompleto"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  maxLength="100"
                  required
                />
                {errores.nombreCompleto && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.nombreCompleto}</span>)}            
                <Tooltip id="tooltip-nombreCompleto" place="top" effect="solid"> Debe diligenciar sus nombres como aparecen en el Documento de Identidad. </Tooltip> 



                <label>Tipo de Documento * <span data-tooltip-id="tooltip-tipoDocumento" className="tooltip-icon" > ℹ️ </span> </label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="DNI">Documento Nacional de Identidad</option>

                </select>
                {errores.tipoDocumento && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.tipoDocumento}</span>)}            
                <Tooltip id="tooltip-tipoDocumento" place="top" effect="solid"> Por favor seleccione el tipo de documento de Identidad que tiene. </Tooltip> 



                <label> Número de Documento * <span data-tooltip-id="tooltip-numeroDocumento" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={(e) => {
                    const nuevoValor = validarNumeroDocumento(formData.tipoDocumento, e.target.value);
                    setFormData({ ...formData, numeroDocumento: nuevoValor });
                  }}
                  maxLength="15"
                  required
                />
                {errores.numeroDocumento && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.numeroDocumento}</span>)}            
                <Tooltip id="tooltip-numeroDocumento" place="top" effect="solid"> Debe diligenciar el numero de documento como aparecen en el Documento de Identidad. </Tooltip>                 



                <label >Fecha de Nacimiento *<span data-tooltip-id="tooltip-fechaNacimiento" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                />
                {errores.fechaNacimiento && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.fechaNacimiento}</span>)}            
                <Tooltip id="tooltip-fechaNacimiento" place="top" effect="solid"> Por favor Diligencie su fecha de nacimiento. </Tooltip>



               <label>País de Nacimiento *<span data-tooltip-id="tooltip-paisNacimiento" className="tooltip-icon" > ℹ️ </span></label>
                <select
                  name="paisNacimiento"
                  value={formData.paisNacimiento}
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value === "Colombia") {
                      setDepartamentos(Object.keys(data.Colombia.departamentos));
                    } else {
                      setDepartamentos([]);
                    }
                  }}
                  required
                >
                  <option value="">Seleccione un país</option>
                  {Object.keys(data.Paises).concat("Colombia").map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
                {errores.paisNacimiento && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.paisNacimiento}</span>)}            
                <Tooltip id="tooltip-paisNacimiento" place="top" effect="solid"> Diligenciar el pais donde usted nacio. </Tooltip>



                {formData.paisNacimiento === "Colombia" && (
                  <>
                    <label>Departamento de Nacimiento *<span data-tooltip-id="tooltip-departamentoNacimiento" className="tooltip-icon" > ℹ️ </span></label>
                    <select
                      name="departamentoNacimiento"
                      value={formData.departamentoNacimiento}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione un departamento</option>
                      {departamentos.map((departamento) => (
                        <option key={departamento} value={departamento}>
                          {departamento}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {errores.departamentoNacimiento && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.departamentoNacimiento}</span>)}            
                <Tooltip id="tooltip-departamentoNacimiento" place="top" effect="solid"> Diligenciar el Departamento donde usted nacio. </Tooltip>                



                <label>Ciudad de Nacimiento * <span data-tooltip-id="tooltip-ciudadNacimiento" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="ciudadNacimiento"
                  value={formData.ciudadNacimiento}
                  onChange={handleChange}
                  required
                />
                {errores.ciudadNacimiento && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.ciudadNacimiento}</span>)}            
                <Tooltip id="tooltip-ciudadNacimiento" place="top" effect="solid"> Diligenciar la ciudad donde usted nacio. </Tooltip>                



                <label>Fecha de Expedición *<span data-tooltip-id="tooltip-fechaExpedicion" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="date"
                  name="fechaExpedicion"
                  value={formData.fechaExpedicion}
                  onChange={handleChange}
                  required
                />
                {errores.fechaExpedicion && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.fechaExpedicion}</span>)}            
                <Tooltip id="tooltip-fechaExpedicion" place="top" effect="solid"> Por favor Diligencie su fecha de Expedicion la cual es el dia que solicito su documento de identidad. </Tooltip>



                <label>País de Expedición *<span data-tooltip-id="tooltip-paisExpedicion" className="tooltip-icon" > ℹ️ </span></label>
                <select
                  name="paisExpedicion"
                  value={formData.paisExpedicion}
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value === "Colombia") {
                      setDepartamentos(Object.keys(data.Colombia.departamentos));
                    } else {
                      setDepartamentos([]);
                    }
                  }}
                  required
                >
                  <option value="">Seleccione un país</option>
                  {Object.keys(data.Paises).concat("Colombia").map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
                {errores.paisExpedicion && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.paisExpedicion}</span>)}            
                <Tooltip id="tooltip-paisExpedicion" place="top" effect="solid"> Diligenciar el país donde usted Solicito el documento de identidad. </Tooltip>



                {formData.paisExpedicion === "Colombia" && (
                  <>
                    <label>Departamento de Expedición *<span data-tooltip-id="tooltip-departamentoExpedicion" className="tooltip-icon" > ℹ️ </span></label>
                    <select
                      name="departamentoExpedicion"
                      value={formData.departamentoExpedicion}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione un departamento</option>
                      {departamentos.map((departamento) => (
                        <option key={departamento} value={departamento}>
                          {departamento}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {errores.departamentoExpedicion && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.departamentoExpedicion}</span>)}            
                <Tooltip id="tooltip-departamentoExpedicion" place="top" effect="solid"> Diligenciar el departamento donde usted Solicito el documento de identidad. </Tooltip>                



                <label>Ciudad de Expedición *<span data-tooltip-id="tooltip-ciudadExpedicion" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="ciudadExpedicion"
                  value={formData.ciudadExpedicion}
                  onChange={handleChange}
                  required
                />
                {errores.ciudadExpedicion && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.ciudadExpedicion}</span>)}            
                <Tooltip id="tooltip-ciudadExpedicion" place="top" effect="solid"> Diligenciar la ciudad donde usted Solicito el documento de identidad. </Tooltip>


              </>
            )}


          
            {/* Campos para Persona Jurídica */}
            {formData.tipoPersona === "PJ" && (
              <>
               
                <label>Razón Social *<span data-tooltip-id="tooltip-razonSocial" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleChange}
                  maxLength="100"
                  required
                />
                {errores.razonSocial && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.razonSocial}</span>)}            
                <Tooltip id="tooltip-razonSocial" place="top" effect="solid"> Por favor Diligencie el nombre de la razon social  o nombre de la empresa. </Tooltip>



                <label>Tipo de Documento *<span data-tooltip-id="tooltip-tipoDocumento" className="tooltip-icon" > ℹ️ </span>  </label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="NIT">NIT</option>
                  <option value="SE">Sociedad Extranjera</option>

                </select>    
                {errores.tipoDocumento && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.tipoDocumento}</span>)}            
                <Tooltip id="tooltip-tipoDocumento" place="top" effect="solid"> Por favor seleccione el tipo de documento de identidad de la empresa. </Tooltip>

                {/* Mostrar los campos solo si selecciona "Si" */}
                {formData.recibeotrosingresos === "SE" && (
                  <>


                    <label>Indique que Tipo de Identificacion de la Sociedad Extranjera*<span data-tooltip-id="tooltip-Valorotrosingresos" className="tooltip-icon" > ℹ️ </span></label>
                    <input
                      type="text"
                      name="tipodeidentificaciondesociedad"
                      value={formData.tipodeidentificaciondesociedad}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, ""); // Solo números
                        const formattedValue = `$ ${parseInt(rawValue || 0).toLocaleString("es-CO")}`;
                        setFormData({ ...formData, tipodeidentificaciondesociedad: formattedValue });
                      }}
                      maxLength="15"
                      placeholder="$ 0"
                      required
                    />
                    <Tooltip id="tooltip-Valorotrosingresos" place="top" effect="solid"> Por favor Diligencie el valor de los otros ingresos. </Tooltip>

                  </>
                )}
             
                <label>Número NIT *<span data-tooltip-id="tooltip-numeroNIT" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="numeroNIT"
                  value={formData.numeroNIT}
                  onChange={(e) => {
                    const value = e.target.value; // Permite números y letras
                    setFormData({ ...formData, numeroNIT: value });
                  }}
                  maxLength="15"
                  required
                />
                {errores.numeroNIT && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.numeroNIT}</span>)}            
                <Tooltip id="tooltip-numeroNIT" place="top" effect="solid"> Por favor relacione el numero de identidad del Representante Legal. </Tooltip>


            
                <label htmlFor="nombreCompletorl">Nombre Completo del Representante Legal*<span data-tooltip-id="tooltip-nombreCompletorl" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  id="nombreCompletorl"
                  name="nombreCompletorl"
                  value={formData.nombreCompletorl}
                  onChange={handleChange}
                  maxLength="100"
                  required
                />     
                {errores.nombreCompletorl && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.nombreCompletorl}</span>)}            
                <Tooltip id="tooltip-nombreCompletorl" place="top" effect="solid"> Por favor diligencie el nombre del Representante Legal. </Tooltip>



                <label>Tipo de Documento Representante Legal *<span data-tooltip-id="tooltip-tipoDocumentorl" className="tooltip-icon" > ℹ️ </span> </label>
                <select
                  name="tipoDocumentorl"
                  value={formData.tipoDocumentorl}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="DNI">Documento Nacional de Identidad</option>

                </select>   
                {errores.tipoDocumentorl && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.tipoDocumentorl}</span>)}            
                <Tooltip id="tooltip-tipoDocumentorl" place="top" effect="solid"> Por favor seleccione el tipo de documento de identidad del Representante Legal. </Tooltip>


             
                <label> Número de Documento Representante Legal* <span data-tooltip-id="tooltip-numeroDocumentorl" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="numeroDocumentorl"
                  value={formData.numeroDocumentorl}
                  onChange={(e) => {
                    const nuevoValor = validarNumeroDocumento(formData.tipoDocumento, e.target.value);
                    setFormData({ ...formData, numeroDocumentorl: nuevoValor });
                  }}
                  maxLength="15"
                  required
                /> 
                {errores.numeroDocumentorl && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.numeroDocumentorl}</span>)}            
                <Tooltip id="tooltip-numeroDocumentorl" place="top" effect="solid"> Por favor relacione  el numero de documento de Representante Legal. </Tooltip>


               
                <label> Descripción de la Relación Comercial * <span data-tooltip-id="tooltip-descripcionrelacioncomercial" className="tooltip-icon" > ℹ️ </span> </label>
                <input
                  type="text"
                  name="descripcionrelacioncomercial"
                  value={formData.descripcionrelacioncomercial}
                  onChange={handleChange}
                  maxLength="100"
                  required
                />  
                {errores.descripcionrelacioncomercial && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.descripcionrelacioncomercial}</span>)}            
                <Tooltip id="tooltip-descripcionrelacioncomercial" place="top" effect="solid"> Por favor describa su relacion economica. </Tooltip>


              
                <label>Fecha de Constitución *<span data-tooltip-id="tooltip-fechaConstitucion" className="tooltip-icon" > ℹ️ </span> </label>
                <input
                  type="date"
                  name="fechaConstitucion"
                  value={formData.fechaConstitucion}
                  onChange={handleChange}
                  required
                />
                {errores.fechaConstitucion && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.fechaConstitucion}</span>)}            
                <Tooltip id="tooltip-fechaConstitucion" place="top" effect="solid"> Por favor seleccione la fecha de constitucion de la empresa. </Tooltip>


               
              </>
            )}

            <label>Teléfono Celular *<span data-tooltip-id="tooltip-telefonoCelular" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="telefonoCelular"
              value={formData.telefonoCelular}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setFormData({ ...formData, telefonoCelular: value });
                }
              }}
              pattern="\d*"
              maxLength="10"
              required
            />
            {errores.telefonoCelular && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.telefonoCelular}</span>)}            
            <Tooltip id="tooltip-telefonoCelular" place="top" effect="solid"> Por favor Diligencie su numero de telefono. </Tooltip>



            <label>Correo Electrónico *<span data-tooltip-id="tooltip-correoElectronico" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, correoElectronico: value });
              }}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es|net|org|edu|gov|co|mx|ar)$"
              title="Debe ser un correo electrónico válido (e.g., ejemplo@dominio.com)"
              required
            />
            {errores.correoElectronico && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.correoElectronico}</span>)}            
            <Tooltip id="tooltip-correoElectronico" place="top" effect="solid"> Por favor Diligencie el correo electronico personal. </Tooltip>



            <label>Dirección de Residencia *<span data-tooltip-id="tooltip-direccionResidencia" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="direccionResidencia"
              value={formData.direccionResidencia}
              onChange={handleChange}
              maxLength="200"
              required
            />
            {errores.direccionResidencia && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.direccionResidencia}</span>)}            
            <Tooltip id="tooltip-direccionResidencia" place="top" effect="solid"> Por favor Diligencie la direccion de residencia o direccion de la empresa. </Tooltip>



            <label>País de Residencia * <span data-tooltip-id="tooltip-paisResidencia" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="paisResidencia"
              value={formData.paisResidencia}
              onChange={(e) => {
                handleChange(e);
                if (e.target.value === "Colombia") {
                  setDepartamentos(Object.keys(data.Colombia.departamentos));
                } else {
                  setDepartamentos([]);
                }
              }}
              required
            >
              <option value="">Seleccione un país</option>
              {Object.keys(data.Paises).concat("Colombia").map((pais) => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
            {errores.paisResidencia && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.paisResidencia}</span>)}            
            <Tooltip id="tooltip-paisResidencia" place="top" effect="solid"> Diligenciar el pais de residencia. </Tooltip>




            {formData.paisResidencia === "Colombia" && (
              <>            
                <label>Departamento de Residencia *<span data-tooltip-id="tooltip-departamentoResidencia" className="tooltip-icon" > ℹ️ </span></label>
                <select
                  name="departamentoResidencia"
                  value={formData.departamentoResidencia}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un departamento</option>
                  {departamentos.map((departamento) => (
                    <option key={departamento} value={departamento}>
                      {departamento}
                    </option>
                  ))}
                </select>
                {errores.departamentoResidencia && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.departamentoResidencia}</span>)}  
                <Tooltip id="tooltip-departamentoResidencia" place="top" effect="solid"> Diligenciar el departamento de residencia. </Tooltip>
                   
              </>
              
            )}
          
            <label>Ciudad de Residencia *<span data-tooltip-id="tooltip-ciudadResidencia" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="ciudadResidencia"
              value={formData.ciudadResidencia}
              onChange={handleChange}
              required
            />
            {errores.ciudadResidencia && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.ciudadResidencia}</span>)}            
            <Tooltip id="tooltip-ciudadResidencia" place="top" effect="solid"> Diligenciar la ciudad de residencia. </Tooltip>



          </>
        )}

        {/* Sección 2: Composicion Accionaria */}
        {step === 2 && (
          <>
                <label>Número de Accionistas Persona Natural *<span data-tooltip-id="tooltip-numAccionistas" className="tooltip-icon" > ℹ️ </span> </label>
                <input
                  type="number"
                  min="1"
                  value={numAccionistasPN}
                  onChange={(e) => {
                    const num = parseInt(e.target.value, 10) || 0;
                    setNumAccionistasPN(num);
                    setAccionistasPN(num > 0 ? Array.from({ length: num }, () => ({
                      nombre: "",
                      tipoIdentificacion: "",
                      numeroIdentificacion: "",
                      paisResidencia: "",
                      departamentoResidencia: "",
                      participacion: "",
                      pep: "",
                      nombreentidadpn: "",
                      cargoPEP: "",
                      fechadevinculacionalcargo: "",
                      fechadedesvinculacioncargo: "",
                      fideicomitentepat: "",
                      EntidadFiduciaria: "",
                      entidadpublica: "",
                      valoradministrado: "",
                      bolsaValores: "",
                    })) : []);
                  }}
                  required
                />
                <Tooltip id="tooltip-numAccionistas" place="top" effect="solid"> Por favor seleccione cuantos accionistas tiene su empresa. </Tooltip>


                {numAccionistasPN > 0 && accionistasPN.length > 0 && accionistasPN.map((accionista, index) => (
                  <div key={index} className="accionista-container">
                    <h4>Accionista {index + 1}</h4>

 
                    <label>Nombre y Apellido *<span data-tooltip-id="tooltip-accionista.nombre" className="tooltip-icon" > ℹ️ </span> </label>
                    <input
                      type="text"
                      value={accionista.nombre}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPN];
                        updatedAccionistas[index].nombre = e.target.value;
                        setAccionistasPN(updatedAccionistas);
                      }}
                      required
                    />
                    <Tooltip id="tooltip-accionista.nombre" place="top" effect="solid"> Por favor diligencie el nombre de la razon social o de la empresa. </Tooltip>



                    <label>Tipo de Identificación *<span data-tooltip-id="tooltip-accionista.tipoIdentificacion" className="tooltip-icon" > ℹ️ </span> </label>
                    <select
                      value={accionista.tipoIdentificacion}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPN];
                        updatedAccionistas[index].tipoIdentificacion = e.target.value;
                        setAccionistasPN(updatedAccionistas);
                      }}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="DNI">Documento Nacional de Identidad</option>
                    </select>
                    <Tooltip id="tooltip-accionista.tipoIdentificacion" place="top" effect="solid"> Por favor seleccione el tipo de documento de la empresa. </Tooltip>                    


                    <label>Número de Identificación * <span data-tooltip-id="tooltip-accionista.numeroIdentificacion" className="tooltip-icon" > ℹ️ </span> </label>
                    <input
                      type="text"
                      value={accionista.numeroIdentificacion}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPN];
                        updatedAccionistas[index].numeroIdentificacion = validarNumeroDocumento(accionista.tipoIdentificacion, e.target.value);
                        setAccionistasPN(updatedAccionistas);
                      }}
                      required
                    />
                    <Tooltip id="tooltip-accionista.numeroIdentificacion" place="top" effect="solid"> Por favor diligencie el numero de identificacion de la empresa. </Tooltip>



                    <label>País de Residencia *<span data-tooltip-id="tooltip-accionista.paisResidencia" className="tooltip-icon" > ℹ️ </span> </label>
                    <select
                      value={accionista.paisResidencia}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPN];
                        updatedAccionistas[index].paisResidencia = e.target.value;
                        setAccionistasPN(updatedAccionistas);
                      }}
                      required
                    >
                      <option value="">Seleccione un país</option>
                      {Object.keys(data.Paises).concat("Colombia").map((pais) => (
                        <option key={pais} value={pais}>
                          {pais}
                        </option>
                      ))}
                    </select>
                    <Tooltip id="tooltip-accionista.paisResidencia" place="top" effect="solid"> Diligenciar el pais de donde se encuentra la oficina. </Tooltip>



                    {accionista.paisResidencia === "Colombia" && (
                      <>                    
                        <label>Departamento de Residencia *<span data-tooltip-id="tooltip-accionista.departamentoResidencia" className="tooltip-icon" > ℹ️ </span> </label>
                        <select
                          value={accionista.departamentoResidencia}
                          onChange={(e) => {
                            const updatedAccionistas = [...accionistasPN];
                            updatedAccionistas[index].departamentoResidencia = e.target.value;
                            setAccionistasPN(updatedAccionistas);
                          }}
                          required
                        >
                          <option value="">Seleccione un departamento</option>
                          {departamentos.map((departamento) => (
                            <option key={departamento} value={departamento}>
                              {departamento}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    <Tooltip id="tooltip-accionista.departamentoResidencia" place="top" effect="solid"> Diligenciar el departamento de donde se encuentra la oficina. </Tooltip>

                    
                 
                    <label>Participación Accionaria (%) *<span data-tooltip-id="tooltip-accionista.participacion" className="tooltip-icon" > ℹ️ </span> </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={accionista.participacion}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPN];
                        updatedAccionistas[index].participacion = e.target.value;
                        setAccionistasPN(updatedAccionistas);
                      }}
                      required
                    />
                    <Tooltip id="tooltip-accionista.participacion" place="top" effect="solid"> Por favor diligencie el porcentaje de participacion de cada uno de los accionistas. </Tooltip>



                    <label>¿Es PEP? (Persona Expuesta Políticamente) *<span data-tooltip-id="tooltip-accionista.pep" className="tooltip-icon" > ℹ️ </span></label>
                    <select
                      value={accionista.pep}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPN];
                        updatedAccionistas[index].pep = e.target.value;
                        setAccionistasPN(updatedAccionistas);
                      }}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                    <Tooltip id="tooltip-accionista.pep" place="top" effect="solid"> Por favor indique si es una persona expuesta politicamente. </Tooltip> 

                    {accionista.pep === "Si" && (
                        <>

                          <label>Nombre Entidad <span data-tooltip-id="tooltip-nombreentidad" className="tooltip-icon" > ℹ️ </span></label>
                          <input
                            type="text"
                            name="nombreentidad"
                            value={accionista.nombreentidadpn}
                            onChange={(e) => {
                              const updatedAccionistas = [...accionistasPN];
                              updatedAccionistas[index].nombreentidadpn = e.target.value;
                              setAccionistasPN(updatedAccionistas);
                            }}
                            maxLength="100"
                          />
                          <Tooltip id="tooltip-nombreentidad" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                



                          <label>Cargo o Rol del PEP Relacionado <span data-tooltip-id="tooltip-accionista.cargoPEP" className="tooltip-icon" > ℹ️ </span></label>
                          <input
                            type="text"
                            value={accionista.cargoPEP}
                            onChange={(e) => {
                              const updatedAccionistas = [...accionistasPN];
                              updatedAccionistas[index].cargoPEP = e.target.value;
                              setAccionistasPN(updatedAccionistas);
                            }}
                            maxLength="100"
                          />
                          <Tooltip id="tooltip-accionista.cargoPEP" place="top" effect="solid"> Por favor Diligencie el cargo o el rol del PEP. </Tooltip>


                          <label>Fecha de Vinculación al cargo*<span data-tooltip-id="tooltip-accionista.fechadevinculacionalcargo" className="tooltip-icon"> ℹ️ </span></label>
                          <input
                            type="date"
                            value={accionista.fechadevinculacionalcargo}
                            onChange={(e) => {
                              const updatedAccionistas = [...accionistasPN];
                              updatedAccionistas[index].fechadevinculacionalcargo = e.target.value;
                              setAccionistasPN(updatedAccionistas);
                            }}
                            required
                          />
                          <Tooltip id="tooltip-accionista.fechadevinculacionalcargo" place="top" effect="solid">Se debe relacionar la fecha de diligenciamiento de este formulario</Tooltip>

                          <label>Fecha de Desvinculación al cargo*<span data-tooltip-id="tooltip-fechadedesvinculacioncargo" className="tooltip-icon"> ℹ️ </span></label>
                          <input
                            type="date"
                            value={accionista.fechadedesvinculacioncargo}
                            onChange={(e) => {
                              const updatedAccionistas = [...accionistasPN];
                              updatedAccionistas[index].fechadedesvinculacioncargo = e.target.value;
                              setAccionistasPN(updatedAccionistas);
                            }}
                            required
                          />
                          <Tooltip id="tooltip-fechadedesvinculacioncargo" place="top" effect="solid">Se debe relacionar la fecha de diligenciamiento de este formulario</Tooltip>

                          <label>¿Es Fideicomitente de patrimonios autonomos o fideicomisos que administren recursos públicos o alguno de sus relacionados de la persona juridica? * <span data-tooltip-id="tooltip-accionista.fideicomitentepat" className="tooltip-icon" > ℹ️ </span></label>
                          <select
                            value={accionista.fideicomitentepat}
                            onChange={(e) => {
                              const updatedAccionistas = [...accionistasPN];
                              updatedAccionistas[index].fideicomitentepat = e.target.value;
                              setAccionistasPN(updatedAccionistas);
                            }}
                            required
                          >
                            <option value="">Seleccione</option>
                            <option value="Si">Sí</option>
                            <option value="No">No</option>
                          </select>
                          <Tooltip id="tooltip-accionista.fideicomitentepat" place="top" effect="solid"> Por favor Diligencie el nombre de la razon social  o nombre de la empresa. </Tooltip>

                            {accionista.fideicomitentepat === "Si" && (
                              <>
                                <label>Entidad Fiduciaria<span data-tooltip-id="tooltip-accionista.EntidadFiduciaria" className="tooltip-icon" > ℹ️ </span></label>
                                <input
                                  type="text"
                                  value={accionista.EntidadFiduciaria}
                                  onChange={(e) => {
                                    const updatedAccionistas = [...accionistasPN];
                                    updatedAccionistas[index].EntidadFiduciaria = e.target.value;
                                    setAccionistasPN(updatedAccionistas);
                                  }}
                                  maxLength="100"
                                />
                                <Tooltip id="tooltip-accionista.EntidadFiduciaria" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                

                                <label>Entidad pública de la cual administra recursos públicos <span data-tooltip-id="tooltip-accionista.entidadpublica" className="tooltip-icon" > ℹ️ </span></label>
                                <input
                                  type="text"
                                  value={accionista.entidadpublica}
                                  onChange={(e) => {
                                    const updatedAccionistas = [...accionistasPN];
                                    updatedAccionistas[index].entidadpublica = e.target.value;
                                    setAccionistasPN(updatedAccionistas);
                                  }}
                                  maxLength="100"
                                />
                                <Tooltip id="tooltip-accionista.entidadpublica" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                

                                <label>Valor Administrado * <span data-tooltip-id="tooltip-accionista.valoradministrado" className="tooltip-icon" > ℹ️ </span></label>
                                <input
                                  type="text"
                                  value={accionista.valoradministrado}
                                  onChange={(e) => {
                                    const updatedAccionistas = [...accionistasPN];
                                    updatedAccionistas[index].valoradministrado = e.target.value;
                                    setAccionistasPN(updatedAccionistas);
                                  }}
                                  maxLength="20"
                                  placeholder="$ 0"
                                  required
                                />
                                <Tooltip id="tooltip-accionista.valoradministrado" place="top" effect="solid"> Por favor Diligencie sus ingresos mensuales. </Tooltip>



                              </>
                            )}


                        </>
                      )}

                    <label>¿Cotiza en la Bolsa de Valores? *<span data-tooltip-id="tooltip-accionista.bolsadevalores" className="tooltip-icon" > ℹ️ </span></label>
                    <select
                      value={accionista.bolsadevalores}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPN];
                        updatedAccionistas[index].pep = e.target.value;
                        setAccionistasPN(updatedAccionistas);
                      }}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                    <Tooltip id="tooltip-accionista.pep" place="top" effect="solid"> Por favor indique si es una persona expuesta politicamente. </Tooltip> 


                  </div>
                ))}
             
                <label>Número de Accionistas Persona Jurídica *</label>
                <input
                  type="number"
                  min="0"
                  value={numAccionistasPJ}
                  onChange={(e) => {
                    const num = parseInt(e.target.value, 10) || 0;
                    setNumAccionistasPJ(num);
                    setAccionistasPJ(num > 0 ? Array.from({ length: num }, () => ({
                      razonSocial: "",
                      tipoIdentificacionpj: "",
                      numeroIdentificacionpj: "",
                      paisResidenciapj: "",
                      departamentoResidenciapj: "",
                      participacionpj: "",
                      peppj: "",
                      nombredelpep: "",
                      tipoDocumentopep: "",
                      numeroDocumentopep: "",
                      cargoPEP: "",
                      fechadevinculacionalcargo: "",
                      fechadedesvinculacioncargo: "",
                      fideicomitentepat: "",
                      EntidadFiduciaria: "",
                      entidadpublica: "",
                      valoradministrado: "",
                      bolsadevalorespj: "",
                    })) : []);
                  }}
                  required
                />
                <Tooltip id="tooltip-numAccionistasPJ" place="top" effect="solid"> Por favor seleccione cuantos accionistas tiene su empresa. </Tooltip>


                {numAccionistasPJ > 0 && accionistasPJ.length > 0 && accionistasPJ.map((accionista, index) => (
                  <div key={index} className="accionista-container">
                    <h4>Accionista {index + 1}</h4>


                    <label>Razón Social *<span data-tooltip-id="tooltip-accionista.razonSocial" className="tooltip-icon" > ℹ️ </span> </label>
                    <input
                      type="text"
                      value={accionista.razonSocial}
                      onChange={(e) => {
                        const updatedAccionistas = accionistasPJ.map((acc, i) =>
                            i === index ? { ...acc, razonSocial: e.target.value } : acc
                        );
                        setAccionistasPJ(updatedAccionistas);
                    }}
                      required
                    />
                    <Tooltip id="tooltip-accionista.razonSocial" place="top" effect="solid"> Por favor diligencie el nombre de la razon social o de la empresa. </Tooltip>



                    <label>Tipo de Identificación *<span data-tooltip-id="tooltip-accionista.tipoIdentificacionpj" className="tooltip-icon" > ℹ️ </span> </label>
                    <select
                      value={accionista.tipoIdentificacionpj}
                      onChange={(e) => {
                        const updatedAccionistas = accionistasPJ.map((acc, i) =>
                            i === index ? { ...acc, tipoIdentificacionpj: e.target.value } : acc
                        );
                        setAccionistasPJ(updatedAccionistas);
                    }}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="NIT">Nit</option>
                      <option value="SE">Sociedad Extranjera</option>

                    </select>
                    <Tooltip id="tooltip-accionista.tipoIdentificacionpj" place="top" effect="solid"> Por favor seleccione el tipo de documento de la empresa. </Tooltip>                    


                    <label>Número de Identificación * <span data-tooltip-id="tooltip-accionista.numeroIdentificacionpj" className="tooltip-icon" > ℹ️ </span> </label>
                    <input
                      type="text"
                      value={accionista.numeroIdentificacionpj}
                      onChange={(e) => {
                        const updatedAccionistas = [...accionistasPJ];
                        updatedAccionistas[index].numeroIdentificacionpj = validarNumeroDocumento(accionista.tipoIdentificacionpj, e.target.value);
                        setAccionistasPJ(updatedAccionistas);
                      }}
                      required
                    />
                    <Tooltip id="tooltip-accionista.numeroIdentificacionpj" place="top" effect="solid"> Por favor diligencie el numero de identificacion de la empresa. </Tooltip>

                    <label>País de Residencia *<span data-tooltip-id="tooltip-accionista.paisResidenciapj" className="tooltip-icon" > ℹ️ </span> </label>
                    <select
                      value={accionista.paisResidenciapj}
                      onChange={(e) => {
                        const updatedAccionistas = accionistasPJ.map((acc, i) =>
                            i === index ? { ...acc, paisResidenciapj: e.target.value } : acc
                        );
                        setAccionistasPJ(updatedAccionistas);
                    }}
                      required
                    >
                      <option value="">Seleccione un país</option>
                      {Object.keys(data.Paises).concat("Colombia").map((pais) => (
                        <option key={pais} value={pais}>
                          {pais}
                        </option>
                      ))}
                    </select>
                    <Tooltip id="tooltip-accionista.paisResidenciapj" place="top" effect="solid"> Diligenciar el pais de donde se encuentra la oficina. </Tooltip>



                    {accionista.paisResidencia === "Colombia" && (
                      <>                    
                        <label>Departamento de Residencia *<span data-tooltip-id="tooltip-accionista.departamentoResidenciapj" className="tooltip-icon" > ℹ️ </span> </label>
                        <select
                          value={accionista.departamentoResidenciapj}
                          onChange={(e) => {
                            const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                i === index ? { ...acc, departamentoResidenciapj: e.target.value } : acc
                            );
                            setAccionistasPJ(updatedAccionistas);
                        }}
                          required
                        >
                          <option value="">Seleccione un departamento</option>
                          {departamentos.map((departamento) => (
                            <option key={departamento} value={departamento}>
                              {departamento}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    <Tooltip id="tooltip-accionista.departamentoResidenciapj" place="top" effect="solid"> Diligenciar el departamento de donde se encuentra la oficina. </Tooltip>

                    
                
                    <label>Participación Accionaria (%) *<span data-tooltip-id="tooltip-accionista.participacionpj" className="tooltip-icon" > ℹ️ </span> </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={accionista.participacionpj}
                      onChange={(e) => {
                        const updatedAccionistas = accionistasPJ.map((acc, i) =>
                            i === index ? { ...acc, participacionpj: e.target.value } : acc
                        );
                        setAccionistasPJ(updatedAccionistas);
                    }}
                      required
                    />
                    <Tooltip id="tooltip-accionista.participacionpj" place="top" effect="solid"> Por favor diligencie el porcentaje de participacion de cada uno de los accionistas. </Tooltip>



                    <label>¿Es PEP? (Persona Expuesta Políticamente) *<span data-tooltip-id="tooltip-accionista.peppj" className="tooltip-icon" > ℹ️ </span></label>
                    <select
                      value={accionista.peppj}
                      onChange={(e) => {
                        const updatedAccionistas = accionistasPJ.map((acc, i) =>
                            i === index ? { ...acc, peppj: e.target.value } : acc
                        );
                        setAccionistasPJ(updatedAccionistas);
                    }}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                    <Tooltip id="tooltip-accionista.peppj" place="top" effect="solid"> Por favor indique si es una persona expuesta politicamente. </Tooltip> 

                      {accionista.peppj === "Si" && (
                        <>


                          <label>Nombre Completo del PEP <span data-tooltip-id="tooltip-accionista.nombredelpep" className="tooltip-icon" > ℹ️ </span></label>
                          <input
                            type="text"
                            value={accionista.nombredelpep}
                            onChange={(e) => {
                              const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                  i === index ? { ...acc, nombredelpep: e.target.value } : acc
                              );
                              setAccionistasPJ(updatedAccionistas);
                          }}
                            maxLength="100"
                          />  
                          <Tooltip id="tooltip-accionista.nombredelpep" place="top" effect="solid"> Por favor Diligencie el nombre del PEP que tiene relacion. </Tooltip>                
                        


                          <label>Tipo de Documento *<span data-tooltip-id="tooltip-accionista.tipoDocumentopep" className="tooltip-icon" > ℹ️ </span></label>
                          <select
                            value={accionista.tipoDocumentopep}
                            onChange={(e) => {
                              const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                  i === index ? { ...acc, tipoDocumentopep: e.target.value } : acc
                              );
                              setAccionistasPJ(updatedAccionistas);
                          }}
                            required
                          >
                            <option value="">Seleccione</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="Pasaporte">Pasaporte</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="DNI">Documento Nacional de Identidad</option>
                            <option value="NIT">NIT</option>
                            <option value="SE">Sociedad Extranjera</option>

                          </select>
                          <Tooltip id="tooltip-accionista.tipoDocumentopep" place="top" effect="solid"> Por favor seleccione el tipo de documento del PEP. </Tooltip>



                          <label> Número de Documento * <span data-tooltip-id="tooltip-accionista.numeroDocumentopep" className="tooltip-icon" > ℹ️ </span></label>
                          <input
                            type="text"
                            value={accionista.numeroDocumentopep}
                            onChange={(e) => {
                              const updatedAccionistas = [...accionistasPJ];
                              updatedAccionistas[index].numeroDocumentopep = validarNumeroDocumento(accionista.tipoIdentificacionpj, e.target.value);
                              setAccionistasPJ(updatedAccionistas);
                            }}
                            required
                            maxLength="15"
                            required
                          />
                          <Tooltip id="tooltip-accionista.numeroDocumentopep" place="top" effect="solid"> Por favor Diligencie el numero de documento de identidad del PEP. </Tooltip>                
                          
                          <label>Nombre Entidad <span data-tooltip-id="tooltip-nombreentidad" className="tooltip-icon" > ℹ️ </span></label>
                          <input
                            type="text"
                            name="nombreentidad"
                            value={accionista.nombreentidadpn}
                            onChange={(e) => {
                              const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                  i === index ? { ...acc, nombreentidadpn: e.target.value } : acc
                              );
                              setAccionistasPJ(updatedAccionistas);
                          }}
                            maxLength="100"
                          />
                          <Tooltip id="tooltip-nombreentidad" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                



                          <label>Cargo o Rol del PEP Relacionado <span data-tooltip-id="tooltip-accionista.cargoPEP" className="tooltip-icon" > ℹ️ </span></label>
                          <input
                            type="text"
                            value={accionista.cargoPEP}
                            onChange={(e) => {
                              const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                  i === index ? { ...acc, cargoPEP: e.target.value } : acc
                              );
                              setAccionistasPJ(updatedAccionistas);
                          }}
                            maxLength="100"
                          />
                          <Tooltip id="tooltip-accionista.cargoPEP" place="top" effect="solid"> Por favor Diligencie el cargo o el rol del PEP. </Tooltip>


                          <label>Fecha de Vinculación al cargo*<span data-tooltip-id="tooltip-accionista.fechadevinculacionalcargo" className="tooltip-icon"> ℹ️ </span></label>
                          <input
                            type="date"
                            value={accionista.fechadevinculacionalcargo}
                            onChange={(e) => {
                              const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                  i === index ? { ...acc, fechadevinculacionalcargo: e.target.value } : acc
                              );
                              setAccionistasPJ(updatedAccionistas);
                          }}
                            required
                          />
                          <Tooltip id="tooltip-accionista.fechadevinculacionalcargo" place="top" effect="solid">Se debe relacionar la fecha de diligenciamiento de este formulario</Tooltip>

                          <label>Fecha de Desvinculación al cargo*<span data-tooltip-id="tooltip-fechadedesvinculacioncargo" className="tooltip-icon"> ℹ️ </span></label>
                          <input
                            type="date"
                            value={accionista.fechadedesvinculacioncargo}
                            onChange={(e) => {
                              const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                  i === index ? { ...acc, fechadedesvinculacioncargo: e.target.value } : acc
                              );
                              setAccionistasPJ(updatedAccionistas);
                          }}
                            required
                          />
                          <Tooltip id="tooltip-fechadedesvinculacioncargo" place="top" effect="solid">Se debe relacionar la fecha de diligenciamiento de este formulario</Tooltip>

                          <label>¿Es Fideicomitente de patrimonios autonomos o fideicomisos que administren recursos públicos o alguno de sus relacionados de la persona juridica? * <span data-tooltip-id="tooltip-accionista.fideicomitentepat" className="tooltip-icon" > ℹ️ </span></label>
                          <select
                            value={accionista.fideicomitentepat}
                            onChange={(e) => {
                              const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                  i === index ? { ...acc, fideicomitentepat: e.target.value } : acc
                              );
                              setAccionistasPJ(updatedAccionistas);
                          }}
                            required
                          >
                            <option value="">Seleccione</option>
                            <option value="Si">Sí</option>
                            <option value="No">No</option>
                          </select>
                          <Tooltip id="tooltip-accionista.fideicomitentepat" place="top" effect="solid"> Por favor Diligencie el nombre de la razon social  o nombre de la empresa. </Tooltip>

                            {accionista.fideicomitentepat === "Si" && (
                              <>
                                <label>Entidad Fiduciaria<span data-tooltip-id="tooltip-accionista.EntidadFiduciaria" className="tooltip-icon" > ℹ️ </span></label>
                                <input
                                  type="text"
                                  value={accionista.EntidadFiduciaria}
                                  onChange={(e) => {
                                    const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                        i === index ? { ...acc, EntidadFiduciaria: e.target.value } : acc
                                    );
                                    setAccionistasPJ(updatedAccionistas);
                                }}
                                  maxLength="100"
                                />
                                <Tooltip id="tooltip-accionista.EntidadFiduciaria" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                

                                <label>Entidad pública de la cual administra recursos públicos <span data-tooltip-id="tooltip-accionista.entidadpublica" className="tooltip-icon" > ℹ️ </span></label>
                                <input
                                  type="text"
                                  value={accionista.entidadpublica}
                                  onChange={(e) => {
                                    const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                        i === index ? { ...acc, entidadpublica: e.target.value } : acc
                                    );
                                    setAccionistasPJ(updatedAccionistas);
                                }}
                                  maxLength="100"
                                />
                                <Tooltip id="tooltip-accionista.entidadpublica" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                

                                <label>Valor Administrado * <span data-tooltip-id="tooltip-accionista.valoradministrado" className="tooltip-icon" > ℹ️ </span></label>
                                <input
                                  type="text"
                                  value={accionista.valoradministrado}
                                  onChange={(e) => {
                                    const updatedAccionistas = accionistasPJ.map((acc, i) =>
                                        i === index ? { ...acc, valoradministrado: e.target.value } : acc
                                    );
                                    setAccionistasPJ(updatedAccionistas);
                                }}
                                  maxLength="20"
                                  placeholder="$ 0"
                                  required
                                />
                                <Tooltip id="tooltip-accionista.valoradministrado" place="top" effect="solid"> Por favor Diligencie sus ingresos mensuales. </Tooltip>



                              </>
                            )}


                        </>
                      )}

                    <label>¿Cotiza en la Bolsa de Valores? *<span data-tooltip-id="tooltip-accionista.bolsadevalorespj" className="tooltip-icon" > ℹ️ </span></label>
                    <select
                      value={accionista.bolsadevalorespj}
                      onChange={(e) => {
                        const updatedAccionistas = accionistasPJ.map((acc, i) =>
                            i === index ? { ...acc, bolsadevalorespj: e.target.value } : acc
                        );
                        setAccionistasPJ(updatedAccionistas);
                    }}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                    <Tooltip id="tooltip-accionista.bolsadevalorespj" place="top" effect="solid"> Por favor indique si es una persona expuesta politicamente. </Tooltip> 


                  </div>
                ))}
                


          </>
        )}

        {/* Sección 3: Información Financiera */}
        {step === 3 && (
          <>

      
            <label>Actividad Económica *<span data-tooltip-id="tooltip-actividadEconomica" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="actividadEconomica"
              value={formData.actividadEconomica}
              onChange={(e) =>
                setFormData({ ...formData, actividadEconomica: e.target.value })
              }
              required
            >

              <option value="0111">0111 - Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas </option>
              <option value="0112">0112 - Cultivo  de arroz </option>
              <option value="0113">0113 - Cultivo de hortalizas, raíces y tubérculos </option>
              <option value="0114">0114 - Cultivo de tabaco </option>
              <option value="0115">0115 - Cultivo de plantas textiles </option>
              <option value="0119">0119 - Otros cultivos transitorios n.c.p.</option>
              <option value="0121">0121 - Cultivo de frutas tropicales y subtropicales</option>
              <option value="0122">0122 - Cultivo de plátano y banano</option>
              <option value="0123">0123 - Cultivo de café</option>
              <option value="0124">0124 - Cultivo de caña de azúcar</option>
              <option value="0125">0125 - Cultivo de flor de corte</option>
              <option value="0126">0126 - Cultivo de palma para aceite (palma africana) y otros frutos oleaginosos</option>
              <option value="0127">0127 - Cultivo de plantas con las que se preparan bebidas</option>
              <option value="0128">0128 - Cultivo de especias y de plantas aromáticas y medicinales </option>
              <option value="0129">0129 - Otros cultivos permanentes n.c.p.</option>
              <option value="0130">0130 - Propagación de plantas (actividades de los viveros, excepto viveros forestales) </option>
              <option value="0141">0141 - Cría de ganado bovino y bufalino</option>
              <option value="0142">0142 - Cría de caballos y otros equinos </option>
              <option value="0143">0143 - Cría de ovejas y cabras </option>
              <option value="0144">0144 - Cría de ganado porcino</option>
              <option value="0145">0145 - Cría de aves de corral</option>
              <option value="0149">0149 - Cría de otros animales n.c.p.</option>
              <option value="0150">0150 - Explotación mixta (agrícola y pecuaria) </option>
              <option value="0161">0161 - Actividades de apoyo a la agricultura </option>
              <option value="0162">0162 - Actividades de apoyo a la ganadería</option>
              <option value="0163">0163 - Actividades posteriores a la cosecha </option>
              <option value="0164">0164 - Tratamiento de semillas para propagación </option>
              <option value="0170">0170 - Caza ordinaria y mediante trampas y actividades de servicios conexas </option>
              <option value="0210">0210 - Silvicultura y otras actividades forestales</option>
              <option value="0220">0220 - Extracción de madera </option>
              <option value="0230">0230 - Recolección de productos forestales diferentes a la madera</option>
              <option value="0240">0240 - Servicios de apoyo a la silvicultura </option>
              <option value="0311">0311 - Pesca marítima </option>
              <option value="0312">0312 - Pesca de agua dulce </option>
              <option value="0321">0321 - Acuicultura marítima </option>
              <option value="0322">0322 - Acuicultura de agua dulce</option>
              <option value="0510">0510 - Extracción de hulla (carbón de piedra)</option>
              <option value="0520">0520 - Extracción de carbón lignito</option>
              <option value="0610">0610 - Extracción de petróleo crudo</option>
              <option value="0620">0620 - Extracción de gas natural</option>
              <option value="0710">0710 - Extracción de minerales de hierro</option>
              <option value="0721">0721 - Extracción de minerales de uranio y de torio</option>
              <option value="0722">0722 - Extracción de oro y otros metales preciosos</option>
              <option value="0723">0723 - Extracción de minerales de níquel</option>
              <option value="0729">0729 - Extracción de otros minerales metalíferos no ferrosos n.c.p.</option>
              <option value="0811">0811 - Extracción de piedra, arena, arcillas comunes, yeso y anhidrita</option>
              <option value="0812">0812 - Extracción de arcillas de uso industrial, caliza, caolín y bentonitas</option>
              <option value="0820">0820 - Extracción de esmeraldas, piedras preciosas y semipreciosas</option>
              <option value="0891">0891 - Extracción de minerales para la fabricación de abonos y productos químicos</option>
              <option value="0892">0892 - Extracción de halita (sal)</option>
              <option value="0899">0899 - Extracción de otros minerales no metálicos n.c.p.</option>
              <option value="0910">0910 - Actividades de apoyo para la extracción de petróleo y de gas natural</option>
              <option value="0990">0990 - Actividades de apoyo para otras actividades de explotación de minas y canteras</option>
              <option value="1011">1011 - Procesamiento y conservación de carne y productos cárnicos</option>
              <option value="1012">1012 - Procesamiento y conservación de pescados, crustáceos y moluscos</option>
              <option value="1020">1020 - Procesamiento y conservación de frutas, legumbres, hortalizas y tubérculos</option>
              <option value="1030">1030 - Elaboración de aceites y grasas de origen vegetal y animal</option>
              <option value="1040">1040 - Elaboración de productos lácteos</option>
              <option value="1051">1051 - Elaboración de productos de molinería</option>
              <option value="1052">1052 - Elaboración de almidones y productos derivados del almidón</option>
              <option value="1061">1061 - Trilla de café</option>
              <option value="1062">1062 - Descafeinado, tostión y molienda del café</option>
              <option value="1063">1063 - Otros derivados del café</option>
              <option value="1071">1071 - Elaboración y refinación de azúcar</option>
              <option value="1072">1072 - Elaboración de panela</option>
              <option value="1081">1081 - Elaboración de productos de panadería</option>
              <option value="1082">1082 - Elaboración de cacao, chocolate y productos de confitería</option>
              <option value="1083">1083 - Elaboración de macarrones, fideos, alcuzcuz y productos farináceos similares</option>
              <option value="1084">1084 - Elaboración de comidas y platos preparados</option>
              <option value="1089">1089 - Elaboración de otros productos alimenticios n.c.p.</option>
              <option value="1090">1090 - Elaboración de alimentos preparados para animales</option>
              <option value="1101">1101 - Destilación, rectificación y mezcla de bebidas alcohólicas</option>
              <option value="1102">1102 - Elaboración de bebidas fermentadas no destiladas</option>
              <option value="1103">1103 - Producción de malta, elaboración de cervezas y otras bebidas malteadas</option>
              <option value="1104">1104 - Elaboración de bebidas no alcohólicas, producción de aguas minerales y de otras aguas embotelladas</option>
              <option value="1200">1200 - Elaboración de productos de tabaco</option>
              <option value="1311">1311 - Preparación e hilatura de fibras textiles</option>
              <option value="1312">1312 - Tejeduría de productos textiles</option>
              <option value="1313">1313 - Acabado de productos textiles</option>
              <option value="1391">1391 - Fabricación de tejidos de punto y ganchillo</option>
              <option value="1392">1392 - Confección de artículos con materiales textiles, excepto prendas de vestir</option>
              <option value="1393">1393 - Fabricación de tapetes y alfombras para pisos</option>
              <option value="1394">1394 - Fabricación de cuerdas, cordeles, cables, bramantes y redes</option>
              <option value="1399">1399 - Fabricación de otros artículos textiles n.c.p.</option>
              <option value="1410">1410 - Confección de prendas de vestir, excepto prendas de piel</option>
              <option value="1420">1420 - Fabricación de artículos de piel</option>
              <option value="1430">1430 - Fabricación de artículos de punto y ganchillo</option>
              <option value="1511">1511 - Curtido y recurtido de cueros; recurtido y teñido de pieles</option>
              <option value="1512">1512 - Fabricación de artículos de viaje, bolsos de mano y artículos similares elaborados en cuero, y fabricación de artículos de talabartería y guarnicionería</option>
              <option value="1513">1513 - Fabricación de artículos de viaje, bolsos de mano y artículos similares; artículos de talabartería y guarnicionería elaborados en otros materiales</option>
              <option value="1521">1521 - Fabricación de calzado de cuero y piel, con cualquier tipo de suela</option>
              <option value="1522">1522 - Fabricación de otros tipos de calzado, excepto calzado de cuero y piel</option>
              <option value="1523">1523 - Fabricación de partes del calzado</option>
              <option value="1610">1610 - Aserrado, acepillado e impregnación de la madera</option>
              <option value="1620">1620 - Fabricación de hojas de madera para enchapado; fabricación de tableros contrachapados, tableros laminados, tableros de partículas y otros tableros y paneles</option>
              <option value="1630">1630 - Fabricación de partes y piezas de madera, de carpintería y ebanistería para la construcción</option>
              <option value="1640">1640 - Fabricación de recipientes de madera</option>
              <option value="1690">1690 - Fabricación de otros productos de madera; fabricación de artículos de corcho, cestería y espartería</option>
              <option value="1701">1701 - Fabricación de pulpas (pastas) celulósicas; papel y cartón</option>
              <option value="1702">1702 - Fabricación de papel y cartón ondulado (corrugado); fabricación de envases, empaques y de embalajes de papel y cartón.</option>
              <option value="1709">1709 - Fabricación de otros artículos de papel y cartón</option>
              <option value="1811">1811 - Actividades de impresión</option>
              <option value="1812">1812 - Actividades de servicios relacionados con la impresión</option>
              <option value="1820">1820 - Producción de copias a partir de grabaciones originales </option>
              <option value="1910">1910 - Fabricación de productos de hornos de coque</option>
              <option value="1921">1921 - Fabricación de productos de la refinación del petróleo</option>
              <option value="1922">1922 - Actividad de mezcla de combustibles</option>
              <option value="2011">2011 - Fabricación de sustancias y productos químicos básicos</option>
              <option value="2012">2012 - Fabricación de abonos y compuestos inorgánicos nitrogenados</option>
              <option value="2013">2013 - Fabricación de plásticos en formas primarias</option>
              <option value="2014">2014 - Fabricación de caucho sintético en formas primarias</option>
              <option value="2021">2021 - Fabricación de plaguicidas y otros productos químicos de uso agropecuario</option>
              <option value="2022">2022 - Fabricación de pinturas, barnices y revestimientos similares, tintas para impresión y masillas</option>
              <option value="2023">2023 - Fabricación de jabones y detergentes, preparados para limpiar y pulir; perfumes y preparados de tocador</option>
              <option value="2029">2029 - Fabricación de otros productos químicos n.c.p.</option>
              <option value="2030">2030 - Fabricación de fibras sintéticas y artificiales</option>
              <option value="2100">2100 - Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos de uso farmacéutico</option>
              <option value="2211">2211 - Fabricación de llantas y neumáticos de caucho</option>
              <option value="2212">2212 - Reencauche de llantas usadas</option>
              <option value="2219">2219 - Fabricación de formas básicas de caucho y otros productos de caucho n.c.p.</option>
              <option value="2221">2221 - Fabricación de formas básicas de plástico</option>
              <option value="2229">2229 - Fabricación de artículos de plástico n.c.p.</option>
              <option value="2310">2310 - Fabricación de vidrio y productos de vidrio</option>
              <option value="2391">2391 - Fabricación de productos refractarios</option>
              <option value="2392">2392 - Fabricación de materiales de arcilla para la construcción</option>
              <option value="2393">2393 - Fabricación de otros productos de cerámica y porcelana</option>
              <option value="2394">2394 - Fabricación de cemento, cal y yeso</option>
              <option value="2395">2395 - Fabricación de artículos de hormigón, cemento y yeso</option>
              <option value="2396">2396 - Corte, tallado y acabado de la piedra</option>
              <option value="2399">2399 - Fabricación de otros productos minerales no metálicos n.c.p.</option>
              <option value="2410">2410 - Industrias básicas de hierro y de acero</option>
              <option value="2421">2421 - Industrias básicas de metales preciosos</option>
              <option value="2429">2429 - Industrias básicas de otros metales no ferrosos</option>
              <option value="2431">2431 - Fundición de hierro y de acero</option>
              <option value="2432">2432 - Fundición de metales no ferrosos </option>
              <option value="2511">2511 - Fabricación de productos metálicos para uso estructural</option>
              <option value="2512">2512 - Fabricación de tanques, depósitos y recipientes de metal, excepto los utilizados para el envase o transporte de mercancías</option>
              <option value="2513">2513 - Fabricación de generadores de vapor, excepto calderas de agua caliente para calefacción central</option>
              <option value="2520">2520 - Fabricación de armas y municiones</option>
              <option value="2591">2591 - Forja, prensado, estampado y laminado de metal; pulvimetalurgia</option>
              <option value="2592">2592 - Tratamiento y revestimiento de metales; mecanizado</option>
              <option value="2593">2593 - Fabricación de artículos de cuchillería, herramientas de mano y artículos de ferretería</option>
              <option value="2599">2599 - Fabricación de otros productos elaborados de metal n.c.p.</option>
              <option value="2610">2610 - Fabricación de componentes y tableros electrónicos</option>
              <option value="2620">2620 - Fabricación de computadoras y de equipo periférico</option>
              <option value="2630">2630 - Fabricación de equipos de comunicación</option>
              <option value="2640">2640 - Fabricación de aparatos electrónicos de consumo</option>
              <option value="2651">2651 - Fabricación de equipo de medición, prueba, navegación y control</option>
              <option value="2652">2652 - Fabricación de relojes</option>
              <option value="2660">2660 - Fabricación de equipo de irradiación y equipo electrónico de uso médico y terapéutico</option>
              <option value="2670">2670 - Fabricación de instrumentos ópticos y equipo fotográfico</option>
              <option value="2680">2680 - Fabricación de medios magnéticos y ópticos para almacenamiento de datos</option>
              <option value="2711">2711 - Fabricación de motores, generadores y transformadores eléctricos</option>
              <option value="2712">2712 - Fabricación de aparatos de distribución y control de la energía eléctrica</option>
              <option value="2720">2720 - Fabricación de pilas, baterías y acumuladores eléctricos</option>
              <option value="2731">2731 - Fabricación de hilos y cables eléctricos y de fibra óptica</option>
              <option value="2732">2732 - Fabricación de dispositivos de cableado</option>
              <option value="2740">2740 - Fabricación de equipos eléctricos de iluminación</option>
              <option value="2750">2750 - Fabricación de aparatos de uso doméstico</option>
              <option value="2790">2790 - Fabricación de otros tipos de equipo eléctrico n.c.p.</option>
              <option value="2811">2811 - Fabricación de motores, turbinas, y partes para motores de combustión interna</option>
              <option value="2812">2812 - Fabricación de equipos de potencia hidráulica y neumática</option>
              <option value="2813">2813 - Fabricación de otras bombas, compresores, grifos y válvulas</option>
              <option value="2814">2814 - Fabricación de cojinetes, engranajes, trenes de engranajes y piezas de transmisión</option>
              <option value="2815">2815 - Fabricación de hornos, hogares y quemadores industriales</option>
              <option value="2816">2816 - Fabricación de equipo de elevación y manipulación</option>
              <option value="2817">2817 - Fabricación de maquinaria y equipo de oficina (excepto computadoras y equipo periférico)</option>
              <option value="2818">2818 - Fabricación de herramientas manuales con motor</option>
              <option value="2819">2819 - Fabricación de otros tipos de maquinaria y equipo de uso general n.c.p.</option>
              <option value="2821">2821 - Fabricación de maquinaria agropecuaria y forestal</option>
              <option value="2822">2822 - Fabricación de máquinas formadoras de metal y de máquinas herramienta</option>
              <option value="2823">2823 - Fabricación de maquinaria para la metalurgia</option>
              <option value="2824">2824 - Fabricación de maquinaria para explotación de minas y canteras y para obras de construcción</option>
              <option value="2825">2825 - Fabricación de maquinaria para la elaboración de alimentos, bebidas y tabaco</option>
              <option value="2826">2826 - Fabricación de maquinaria para la elaboración de productos textiles, prendas de vestir y cueros</option>
              <option value="2829">2829 - Fabricación de otros tipos de maquinaria y equipo de uso especial n.c.p.</option>
              <option value="2910">2910 - Fabricación de vehículos automotores y sus motores</option>
              <option value="2920">2920 - Fabricación de carrocerías para vehículos automotores; fabricación de remolques y semirremolques </option>
              <option value="2930">2930 - Fabricación de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores</option>
              <option value="3011">3011 - Construcción de barcos y de estructuras flotantes</option>
              <option value="3012">3012 - Construcción de embarcaciones de recreo y deporte</option>
              <option value="3020">3020 - Fabricación de locomotoras y de material rodante para ferrocarriles</option>
              <option value="3030">3030 - Fabricación de aeronaves, naves espaciales y de maquinaria conexa</option>
              <option value="3040">3040 - Fabricación de vehículos militares de combate</option>
              <option value="3091">3091 - Fabricación de motocicletas</option>
              <option value="3092">3092 - Fabricación de bicicletas y de sillas de ruedas para personas con discapacidad</option>
              <option value="3099">3099 - Fabricación de otros tipos de equipo de transporte n.c.p.</option>
              <option value="3110">3110 - Fabricación de muebles </option>
              <option value="3120">3120 - Fabricación de colchones y somieres</option>
              <option value="3210">3210 - Fabricación de joyas, bisutería y artículos conexos</option>
              <option value="3220">3220 - Fabricación de instrumentos musicales</option>
              <option value="3230">3230 - Fabricación de artículos y equipo para la práctica del deporte</option>
              <option value="3240">3240 - Fabricación de juegos, juguetes y rompecabezas</option>
              <option value="3250">3250 - Fabricación de instrumentos, aparatos y materiales médicos y odontológicos (incluido mobiliario)</option>
              <option value="3290">3290 - Otras industrias manufactureras n.c.p.</option>
              <option value="3311">3311 - Mantenimiento y reparación especializado de productos elaborados en metal</option>
              <option value="3312">3312 - Mantenimiento y reparación especializado de maquinaria y equipo</option>
              <option value="3313">3313 - Mantenimiento y reparación especializado de equipo electrónico y óptico</option>
              <option value="3314">3314 - Mantenimiento y reparación especializado de equipo eléctrico</option>
              <option value="3315">3315 - Mantenimiento y reparación especializado de equipo de transporte, excepto los vehículos automotores, motocicletas y bicicletas</option>
              <option value="3319">3319 - Mantenimiento y reparación de otros tipos de equipos y sus componentes n.c.p.</option>
              <option value="3320">3320 - Instalación especializada de maquinaria y equipo industrial </option>
              <option value="3511">3511 - Generación de energía eléctrica</option>
              <option value="3512">3512 - Transmisión de energía eléctrica</option>
              <option value="3513">3513 - Distribución de energía eléctrica</option>
              <option value="3514">3514 - Comercialización de energía eléctrica</option>
              <option value="3520">3520 - Producción de gas; distribución de combustibles gaseosos por tuberías</option>
              <option value="3530">3530 - Suministro de vapor y aire acondicionado</option>
              <option value="3600">3600 - Captación, tratamiento y distribución de agua</option>
              <option value="3700">3700 - Evacuación y tratamiento de aguas residuales</option>
              <option value="3811">3811 - Recolección de desechos no peligrosos</option>
              <option value="3812">3812 - Recolección de desechos peligrosos</option>
              <option value="3821">3821 - Tratamiento y disposición de desechos no peligrosos</option>
              <option value="3822">3822 - Tratamiento y disposición de desechos peligrosos</option>
              <option value="3830">3830 - Recuperación de materiales</option>
              <option value="3900">3900 - Actividades de saneamiento ambiental y otros servicios de gestión de desechos</option>
              <option value="4111">4111 - Construcción de edificios residenciales</option>
              <option value="4112">4112 - Construcción de edificios no residenciales</option>
              <option value="4210">4210 - Construcción de carreteras y vías de ferrocarril</option>
              <option value="4220">4220 - Construcción de proyectos de servicio público</option>
              <option value="4290">4290 - Construcción de otras obras de ingeniería civil</option>
              <option value="4311">4311 - Demolición</option>
              <option value="4312">4312 - Preparación del terreno</option>
              <option value="4321">4321 - Instalaciones eléctricas</option>
              <option value="4322">4322 - Instalaciones de fontanería, calefacción y aire acondicionado</option>
              <option value="4329">4329 - Otras instalaciones especializadas</option>
              <option value="4330">4330 - Terminación y acabado de edificios y obras de ingeniería civil</option>
              <option value="4390">4390 - Otras actividades especializadas para la construcción de edificios y obras de ingeniería civil</option>
              <option value="4511">4511 - Comercio de vehículos automotores nuevos</option>
              <option value="4512">4512 - Comercio de vehículos automotores usados</option>
              <option value="4520">4520 - Mantenimiento y reparación de vehículos automotores</option>
              <option value="4530">4530 - Comercio de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores</option>
              <option value="4541">4541 - Comercio de motocicletas y de sus partes, piezas y accesorios</option>
              <option value="4542">4542 - Mantenimiento y reparación de motocicletas y de sus partes y piezas</option>
              <option value="4610">4610 - Comercio al por mayor a cambio de una retribución o por contrata</option>
              <option value="4620">4620 - Comercio al por mayor de materias primas agropecuarias; animales vivos</option>
              <option value="4631">4631 - Comercio al por mayor de productos alimenticios</option>
              <option value="4632">4632 - Comercio al por mayor de bebidas y tabaco</option>
              <option value="4641">4641 - Comercio al por mayor de productos textiles, productos confeccionados para uso doméstico</option>
              <option value="4642">4642 - Comercio al por mayor de prendas de vestir</option>
              <option value="4643">4643 - Comercio al por mayor de calzado</option>
              <option value="4644">4644 - Comercio al por mayor de aparatos y equipo de uso doméstico</option>
              <option value="4645">4645 - Comercio al por mayor de productos farmacéuticos, medicinales, cosméticos y de tocador</option>
              <option value="4649">4649 - Comercio al por mayor de otros utensilios domésticos n.c.p.</option>
              <option value="4651">4651 - Comercio al por mayor de computadores, equipo periférico y programas de informática</option>
              <option value="4652">4652 - Comercio al por mayor de equipo, partes y piezas electrónicos y de telecomunicaciones</option>
              <option value="4653">4653 - Comercio al por mayor de maquinaria y equipo agropecuarios</option>
              <option value="4659">4659 - Comercio al por mayor de otros tipos de maquinaria y equipo n.c.p.</option>
              <option value="4661">4661 - Comercio al por mayor de combustibles sólidos, líquidos, gaseosos y productos conexos</option>
              <option value="4662">4662 - Comercio al por mayor de metales y productos metalíferos</option>
              <option value="4663">4663 - Comercio al por mayor de materiales de construcción, artículos de ferretería, pinturas, productos de vidrio, equipo y materiales de fontanería y calefacción</option>
              <option value="4664">4664 - Comercio al por mayor de productos químicos básicos, cauchos y plásticos en formas primarias y productos químicos de uso agropecuario</option>
              <option value="4665">4665 - Comercio al por mayor de desperdicios, desechos y chatarra</option>
              <option value="4669">4669 - Comercio al por mayor de otros productos n.c.p.</option>
              <option value="4690">4690 - Comercio al por mayor no especializado</option>
              <option value="4711">4711 - Comercio al por menor en establecimientos no especializados con surtido compuesto principalmente por alimentos, bebidas o tabaco</option>
              <option value="4719">4719 - Comercio al por menor en establecimientos no especializados, con surtido compuesto principalmente por productos diferentes de alimentos (víveres en general), bebidas y tabaco</option>
              <option value="4721">4721 - Comercio al por menor de productos agrícolas para el consumo en establecimientos especializados</option>
              <option value="4722">4722 - Comercio al por menor de leche, productos lácteos y huevos, en establecimientos especializados</option>
              <option value="4723">4723 - Comercio al por menor de carnes (incluye aves de corral), productos cárnicos, pescados y productos de mar, en establecimientos especializados</option>
              <option value="4724">4724 - Comercio al por menor de bebidas y productos del tabaco, en establecimientos especializados</option>
              <option value="4729">4729 - Comercio al por menor de otros productos alimenticios n.c.p., en establecimientos especializados</option>
              <option value="4731">4731 - Comercio al por menor de combustible para automotores</option>
              <option value="4732">4732 - Comercio al por menor de lubricantes (aceites, grasas), aditivos y productos de limpieza para vehículos automotores</option>
              <option value="4741">4741 - Comercio al por menor de computadores, equipos periféricos, programas de informática y equipos de telecomunicaciones en establecimientos especializados</option>
              <option value="4742">4742 - Comercio al por menor de equipos y aparatos de sonido y de video, en establecimientos especializados</option>
              <option value="4751">4751 - Comercio al por menor de productos textiles en establecimientos especializados</option>
              <option value="4752">4752 - Comercio al por menor de artículos de ferretería, pinturas y productos de vidrio en establecimientos especializados</option>
              <option value="4753">4753 - Comercio al por menor de tapices, alfombras y cubrimientos para paredes y pisos en establecimientos especializados</option>
              <option value="4754">4754 - Comercio al por menor de electrodomésticos y gasodomésticos de uso doméstico, muebles y equipos de iluminación</option>
              <option value="4755">4755 - Comercio al por menor de artículos y utensilios de uso doméstico</option>
              <option value="4759">4759 - Comercio al por menor de otros artículos domésticos en establecimientos especializados</option>
              <option value="4761">4761 - Comercio al por menor de libros, periódicos, materiales y artículos de papelería y escritorio, en establecimientos especializados</option>
              <option value="4762">4762 - Comercio al por menor de artículos deportivos, en establecimientos especializados </option>
              <option value="4769">4769 - Comercio al por menor de otros artículos culturales y de entretenimiento n.c.p. en establecimientos especializados</option>
              <option value="4771">4771 - Comercio al por menor de prendas de vestir y sus accesorios (incluye artículos de piel) en establecimientos especializados</option>
              <option value="4772">4772 - Comercio al por menor de todo tipo de calzado y artículos de cuero y sucedáneos del cuero en establecimientos especializados.</option>
              <option value="4773">4773 - Comercio al por menor de productos farmacéuticos y medicinales, cosméticos y artículos de tocador en establecimientos especializados</option>
              <option value="4774">4774 - Comercio al por menor de otros productos nuevos en establecimientos especializados</option>
              <option value="4775">4775 - Comercio al por menor de artículos de segunda mano</option>
              <option value="4781">4781 - Comercio al por menor de alimentos, bebidas y tabaco, en puestos de venta móviles</option>
              <option value="4782">4782 - Comercio al por menor de productos textiles, prendas de vestir y calzado, en puestos de venta móviles</option>
              <option value="4789">4789 - Comercio al por menor de otros productos en puestos de venta móviles</option>
              <option value="4791">4791 - Comercio al por menor realizado a través de Internet</option>
              <option value="4792">4792 - Comercio al por menor realizado a través de casas de venta o por correo</option>
              <option value="4799">4799 - Otros tipos de comercio al por menor no realizado en establecimientos, puestos de venta o mercados.</option>
              <option value="4911">4911 - Transporte férreo de pasajeros</option>
              <option value="4912">4912 - Transporte férreo de carga </option>
              <option value="4921">4921 - Transporte de pasajeros</option>
              <option value="4922">4922 - Transporte mixto</option>
              <option value="4923">4923 - Transporte de carga por carretera</option>
              <option value="4930">4930 - Transporte por tuberías</option>
              <option value="5011">5011 - Transporte de pasajeros marítimo y de cabotaje </option>
              <option value="5012">5012 - Transporte de carga marítimo y de cabotaje </option>
              <option value="5021">5021 - Transporte fluvial de pasajeros</option>
              <option value="5022">5022 - Transporte fluvial de carga</option>
              <option value="5111">5111 - Transporte aéreo nacional de pasajeros </option>
              <option value="5112">5112 - Transporte aéreo internacional de pasajeros </option>
              <option value="5121">5121 - Transporte aéreo nacional de carga </option>
              <option value="5122">5122 - Transporte aéreo internacional de carga </option>
              <option value="5210">5210 - Almacenamiento y depósito</option>
              <option value="5221">5221 - Actividades de estaciones, vías y servicios complementarios para el transporte terrestre</option>
              <option value="5222">5222 - Actividades de puertos y servicios complementarios para el transporte acuático</option>
              <option value="5223">5223 - Actividades de aeropuertos, servicios de navegación aérea y demás actividades conexas al transporte aéreo</option>
              <option value="5224">5224 - Manipulación de carga</option>
              <option value="5229">5229 - Otras actividades complementarias al transporte</option>
              <option value="5310">5310 - Actividades postales nacionales</option>
              <option value="5320">5320 - Actividades de mensajería</option>
              <option value="5511">5511 - Alojamiento en hoteles </option>
              <option value="5512">5512 - Alojamiento en apartahoteles</option>
              <option value="5513">5513 - Alojamiento en centros vacacionales </option>
              <option value="5514">5514 - Alojamiento rural</option>
              <option value="5519">5519 - Otros tipos de alojamientos para visitantes</option>
              <option value="5520">5520 - Actividades de zonas de camping y parques para vehículos recreacionales</option>
              <option value="5530">5530 - Servicio por horas </option>
              <option value="5590">5590 - Otros tipos de alojamiento n.c.p.</option>
              <option value="5611">5611 - Expendio a la mesa de comidas preparadas</option>
              <option value="5612">5612 - Expendio por autoservicio de comidas preparadas</option>
              <option value="5613">5613 - Expendio de comidas preparadas en cafeterías</option>
              <option value="5619">5619 - Otros tipos de expendio de comidas preparadas n.c.p.</option>
              <option value="5621">5621 - Catering para eventos</option>
              <option value="5629">5629 - Actividades de otros servicios de comidas</option>
              <option value="5630">5630 - Expendio de bebidas alcohólicas para el consumo dentro del establecimiento</option>
              <option value="5811">5811 - Edición de libros</option>
              <option value="5812">5812 - Edición de directorios y listas de correo</option>
              <option value="5813">5813 - Edición de periódicos, revistas y otras publicaciones periódicas</option>
              <option value="5819">5819 - Otros trabajos de edición</option>
              <option value="5820">5820 - Edición de programas de informática (software)</option>
              <option value="5911">5911 - Actividades de producción de películas cinematográficas, videos, programas, anuncios y comerciales de televisión</option>
              <option value="5912">5912 - Actividades de posproducción de películas cinematográficas, videos, programas, anuncios y comerciales de televisión</option>
              <option value="5913">5913 - Actividades de distribución de películas cinematográficas, videos, programas, anuncios y comerciales de televisión</option>
              <option value="5914">5914 - Actividades de exhibición de películas cinematográficas y videos</option>
              <option value="5920">5920 - Actividades de grabación de sonido y edición de música</option>
              <option value="6010">6010 - Actividades de programación y transmisión en el servicio de radiodifusión sonora</option>
              <option value="6020">6020 - Actividades de programación y transmisión de televisión</option>
              <option value="6110">6110 - Actividades de telecomunicaciones alámbricas</option>
              <option value="6120">6120 - Actividades de telecomunicaciones inalámbricas</option>
              <option value="6130">6130 - Actividades de telecomunicación satelital</option>
              <option value="6190">6190 - Otras actividades de telecomunicaciones</option>
              <option value="6201">6201 - Actividades de desarrollo de sistemas informáticos (planificación, análisis, diseño, programación, pruebas)</option>
              <option value="6202">6202 - Actividades de consultoría informática y actividades de administración de instalaciones informáticas</option>
              <option value="6209">6209 - Otras actividades de tecnologías de información y actividades de servicios informáticos</option>
              <option value="6311">6311 - Procesamiento de datos, alojamiento (hosting) y actividades relacionadas</option>
              <option value="6312">6312 - Portales web</option>
              <option value="6391">6391 - Actividades de agencias de noticias</option>
              <option value="6399">6399 - Otras actividades de servicio de información n.c.p.</option>
              <option value="6411">6411 - Banco Central</option>
              <option value="6412">6412 - Bancos comerciales</option>
              <option value="6421">6421 - Actividades de las corporaciones financieras</option>
              <option value="6422">6422 - Actividades de las compañías de financiamiento</option>
              <option value="6423">6423 - Banca de segundo piso</option>
              <option value="6424">6424 - Actividades de las cooperativas financieras</option>
              <option value="6431">6431 - Fideicomisos, fondos y entidades financieras similares</option>
              <option value="6432">6432 - Fondos de cesantías</option>
              <option value="6491">6491 - Leasing financiero (arrendamiento financiero)</option>
              <option value="6492">6492 - Actividades financieras de fondos de empleados y otras formas asociativas del sector solidario</option>
              <option value="6493">6493 - Actividades de compra de cartera o factoring</option>
              <option value="6494">6494 - Otras actividades de distribución de fondos</option>
              <option value="6495">6495 - Instituciones especiales oficiales</option>
              <option value="6499">6499 - Otras actividades de servicio financiero, excepto las de seguros y pensiones n.c.p.</option>
              <option value="6511">6511 - Seguros generales </option>
              <option value="6512">6512 - Seguros de vida</option>
              <option value="6513">6513 - Reaseguros</option>
              <option value="6514">6514 - Capitalización</option>
              <option value="6521">6521 - Servicios de seguros sociales de salud</option>
              <option value="6522">6522 - Servicios de seguros sociales de riesgos profesionales</option>
              <option value="6531">6531 - Régimen de prima media con prestación definida (RPM)</option>
              <option value="6532">6532 - Régimen de ahorro individual (RAI)</option>
              <option value="6611">6611 - Administración de mercados financieros</option>
              <option value="6612">6612 - Corretaje de valores y de contratos de productos básicos</option>
              <option value="6613">6613 - Otras actividades relacionadas con el mercado de valores</option>
              <option value="6614">6614 - Actividades de las casas de cambio</option>
              <option value="6615">6615 - Actividades de los profesionales de compra y venta de divisas</option>
              <option value="6619">6619 - Otras actividades auxiliares de las actividades de servicios financieros n.c.p.</option>
              <option value="6621">6621 - Actividades de agentes y corredores de seguros</option>
              <option value="6629">6629 - Evaluación de riesgos y daños, y otras actividades de servicios auxiliares</option>
              <option value="6630">6630 - Actividades de administración de fondos</option>
              <option value="6810">6810 - Actividades inmobiliarias realizadas con bienes propios o arrendados</option>
              <option value="6820">6820 - Actividades inmobiliarias realizadas a cambio de una retribución o por contrata </option>
              <option value="6910">6910 - Actividades jurídicas</option>
              <option value="6920">6920 - Actividades de contabilidad, teneduría de libros, auditoría financiera y asesoría tributaria</option>
              <option value="7010">7010 - Actividades de administración empresarial</option>
              <option value="7020">7020 - Actividades de consultaría de gestión</option>
              <option value="7110">7110 - Actividades de arquitectura e ingeniería y otras actividades conexas de consultoría técnica</option>
              <option value="7120">7120 - Ensayos y análisis técnicos</option>
              <option value="7210">7210 - Investigaciones y desarrollo experimental en el campo de las ciencias naturales y la ingeniería </option>
              <option value="7220">7220 - Investigaciones y desarrollo experimental en el campo de las ciencias sociales y las humanidades</option>
              <option value="7310">7310 - Publicidad</option>
              <option value="7320">7320 - Estudios de mercado y realización de encuestas de opinión pública</option>
              <option value="7410">7410 - Actividades especializadas de diseño </option>
              <option value="7420">7420 - Actividades de fotografía</option>
              <option value="7490">7490 - Otras actividades profesionales, científicas y técnicas n.c.p.</option>
              <option value="7500">7500 - Actividades veterinarias</option>
              <option value="7710">7710 - Alquiler y arrendamiento de vehículos automotores</option>
              <option value="7721">7721 - Alquiler y arrendamiento de equipo recreativo y deportivo</option>
              <option value="7722">7722 - Alquiler de videos y discos </option>
              <option value="7729">7729 - Alquiler y arrendamiento de otros efectos personales y enseres domésticos n.c.p.</option>
              <option value="7730">7730 - Alquiler y arrendamiento de otros tipos de maquinaria, equipo y bienes tangibles n.c.p.</option>
              <option value="7740">7740 - Arrendamiento de propiedad intelectual y productos similares, excepto obras protegidas por derechos de autor</option>
              <option value="7810">7810 - Actividades de agencias de empleo</option>
              <option value="7820">7820 - Actividades de agencias de empleo temporal</option>
              <option value="7830">7830 - Otras actividades de suministro de recurso humano</option>
              <option value="7911">7911 - Actividades de las agencias de viaje</option>
              <option value="7912">7912 - Actividades de operadores turísticos</option>
              <option value="7990">7990 - Otros servicios de reserva y actividades relacionadas</option>
              <option value="8010">8010 - Actividades de seguridad privada</option>
              <option value="8020">8020 - Actividades de servicios de sistemas de seguridad</option>
              <option value="8030">8030 - Actividades de detectives e investigadores privados</option>
              <option value="8110">8110 - Actividades combinadas de apoyo a instalaciones</option>
              <option value="8121">8121 - Limpieza general interior de edificios</option>
              <option value="8129">8129 - Otras actividades de limpieza de edificios e instalaciones industriales</option>
              <option value="8130">8130 - Actividades de paisajismo y servicios de mantenimiento conexos</option>
              <option value="8211">8211 - Actividades combinadas de servicios administrativos de oficina</option>
              <option value="8219">8219 - Fotocopiado, preparación de documentos y otras actividades especializadas de apoyo a oficina</option>
              <option value="8220">8220 - Actividades de centros de llamadas (Call center)</option>
              <option value="8230">8230 - Organización de convenciones y eventos comerciales</option>
              <option value="8291">8291 - Actividades de agencias de cobranza y oficinas de calificación crediticia</option>
              <option value="8292">8292 - Actividades de envase y empaque</option>
              <option value="8299">8299 - Otras actividades de servicio de apoyo a las empresas n.c.p.</option>
              <option value="8411">8411 - Actividades legislativas de la administración pública</option>
              <option value="8412">8412 - Actividades ejecutivas de la administración pública</option>
              <option value="8413">8413 - Regulación de las actividades de organismos que prestan servicios de salud, educativos, culturales y otros servicios sociales, excepto servicios de seguridad social </option>
              <option value="8414">8414 - Actividades reguladoras y facilitadoras de la actividad económica</option>
              <option value="8415">8415 - Actividades de los otros órganos de control</option>
              <option value="8421">8421 - Relaciones exteriores </option>
              <option value="8422">8422 - Actividades de defensa</option>
              <option value="8423">8423 - Orden público y actividades de seguridad</option>
              <option value="8424">8424 - Administración de justicia</option>
              <option value="8430">8430 - Actividades de planes de seguridad social de afiliación obligatoria</option>
              <option value="8511">8511 - Educación de la primera infancia</option>
              <option value="8512">8512 - Educación preescolar</option>
              <option value="8513">8513 - Educación básica primaria</option>
              <option value="8521">8521 - Educación básica secundaria </option>
              <option value="8522">8522 - Educación media académica</option>
              <option value="8523">8523 - Educación media técnica y de formación laboral</option>
              <option value="8530">8530 - Establecimientos que combinan diferentes niveles de educación </option>
              <option value="8541">8541 - Educación técnica profesional</option>
              <option value="8542">8542 - Educación tecnológica</option>
              <option value="8543">8543 - Educación de instituciones universitarias o de escuelas tecnológicas</option>
              <option value="8544">8544 - Educación de universidades</option>
              <option value="8551">8551 - Formación académica no formal </option>
              <option value="8552">8552 - Enseñanza deportiva y recreativa</option>
              <option value="8553">8553 - Enseñanza cultural</option>
              <option value="8559">8559 - Otros tipos de educación n.c.p.</option>
              <option value="8560">8560 - Actividades de apoyo a la educación</option>
              <option value="8610">8610 - Actividades de hospitales y clínicas, con internación</option>
              <option value="8621">8621 - Actividades de la práctica médica, sin internación</option>
              <option value="8622">8622 - Actividades de la práctica odontológica</option>
              <option value="8691">8691 - Actividades de apoyo diagnóstico</option>
              <option value="8692">8692 - Actividades de apoyo terapéutico</option>
              <option value="8699">8699 - Otras actividades de atención de la salud humana</option>
              <option value="8710">8710 - Actividades de atención residencial medicalizada de tipo general</option>
              <option value="8720">8720 - Actividades de atención residencial, para el cuidado de pacientes con retardo mental, enfermedad mental y consumo de sustancias psicoactivas</option>
              <option value="8730">8730 - Actividades de atención en instituciones para el cuidado de personas mayores y/o discapacitadas</option>
              <option value="8790">8790 - Otras actividades de atención en instituciones con alojamiento</option>
              <option value="8810">8810 - Actividades de asistencia social sin alojamiento para personas mayores y discapacitadas</option>
              <option value="8890">8890 - Otras actividades de asistencia social sin alojamiento</option>
              <option value="9001">9001 - Creación literaria</option>
              <option value="9002">9002 - Creación musical</option>
              <option value="9003">9003 - Creación teatral</option>
              <option value="9004">9004 - Creación audiovisual</option>
              <option value="9005">9005 - Artes plásticas y visuales</option>
              <option value="9006">9006 - Actividades teatrales</option>
              <option value="9007">9007 - Actividades de espectáculos musicales en vivo</option>
              <option value="9008">9008 - Otras actividades de espectáculos en vivo</option>
              <option value="9101">9101 - Actividades de bibliotecas y archivos</option>
              <option value="9102">9102 - Actividades y funcionamiento de museos, conservación de edificios y sitios históricos</option>
              <option value="9103">9103 - Actividades de jardines botánicos, zoológicos y reservas naturales</option>
              <option value="9200">9200 - Actividades de juegos de azar y apuestas</option>
              <option value="9311">9311 - Gestión de instalaciones deportivas</option>
              <option value="9312">9312 - Actividades de clubes deportivos</option>
              <option value="9319">9319 - Otras actividades deportivas</option>
              <option value="9321">9321 - Actividades de parques de atracciones y parques temáticos</option>
              <option value="9329">9329 - Otras actividades recreativas y de esparcimiento n.c.p.</option>
              <option value="9411">9411 - Actividades de asociaciones empresariales y de empleadores</option>
              <option value="9412">9412 - Actividades de asociaciones profesionales</option>
              <option value="9420">9420 - Actividades de sindicatos de empleados</option>
              <option value="9491">9491 - Actividades de asociaciones religiosas</option>
              <option value="9492">9492 - Actividades de asociaciones políticas</option>
              <option value="9499">9499 - Actividades de otras asociaciones n.c.p.</option>
              <option value="9511">9511 - Mantenimiento y reparación de computadores y de equipo periférico</option>
              <option value="9512">9512 - Mantenimiento y reparación de equipos de comunicación</option>
              <option value="9521">9521 - Mantenimiento y reparación de aparatos electrónicos de consumo</option>
              <option value="9522">9522 - Mantenimiento y reparación de aparatos y equipos domésticos y de jardinería </option>
              <option value="9523">9523 - Reparación de calzado y artículos de cuero</option>
              <option value="9524">9524 - Reparación de muebles y accesorios para el hogar</option>
              <option value="9529">9529 - Mantenimiento y reparación de otros efectos personales y enseres domésticos</option>
              <option value="9601">9601 - Lavado y limpieza, incluso la limpieza en seco, de productos textiles y de piel</option>
              <option value="9602">9602 - Peluquería y otros tratamientos de belleza</option>
              <option value="9603">9603 - Pompas fúnebres y actividades relacionadas</option>
              <option value="9609">9609 - Otras actividades de servicios personales n.c.p.</option>
              <option value="9700">9700 - Actividades de los hogares individuales como empleadores de personal doméstico</option>
              <option value="9810">9810 - Actividades no diferenciadas de los hogares individuales como productores de bienes para uso propio</option>
              <option value="9820">9820 - Actividades no diferenciadas de los hogares individuales como productores de servicios para uso propio</option>
              <option value="9900">9900 - Actividades de organizaciones y entidades extraterritoriales</option>

            </select>
            {errores.actividadEconomica && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.actividadEconomica}</span>)}            
            <Tooltip id="tooltip-actividadEconomica" place="top" effect="solid"> Por favor seleccione su actividad economica que desempeña. </Tooltip>



            <label>Ingresos Mensuales * <span data-tooltip-id="tooltip-ingresosMensuales" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="ingresosMensuales"
              value={formData.ingresosMensuales}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Elimina todo excepto números
                const formattedValue = `$ ${parseInt(rawValue || 0).toLocaleString("es-CO")}`;
                setFormData({ ...formData, ingresosMensuales: formattedValue });
              }}
              maxLength="20"
              placeholder="$ 0"
              required
            />
            {errores.ingresosMensuales && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.ingresosMensuales}</span>)}            
            <Tooltip id="tooltip-ingresosMensuales" place="top" effect="solid"> Por favor Diligencie sus ingresos mensuales. </Tooltip>



            <label>Recibe Otros Ingresos* <span data-tooltip-id="tooltip-recibeotrosingresos" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="recibeotrosingresos"
              value={formData.recibeotrosingresos}
              onChange={(e) => {
                const recibeotrosingresos = e.target.value;
                
                setFormData({
                  ...formData,
                  recibeotrosingresos,
                  Valorotrosingresos: recibeotrosingresos === "Si" ? "" : "0", // Si es "No", deja en $0
                  descrpcionotrosingresos: "",
                });
              }}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
            {errores.recibeotrosingresos && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.recibeotrosingresos}</span>)}            
            <Tooltip id="tooltip-recibeotrosingresos" place="top" effect="solid"> Seleccione  alguna de las opciones si cuenta con algun otro ingreso aparte de su ingreso mensual. </Tooltip>



            {/* Mostrar los campos solo si selecciona "Si" */}
            {formData.recibeotrosingresos === "Si" && (
              <>


                <label>Valor de los Otros Ingresos*<span data-tooltip-id="tooltip-Valorotrosingresos" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="Valorotrosingresos"
                  value={formData.Valorotrosingresos}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, ""); // Solo números
                    const formattedValue = `$ ${parseInt(rawValue || 0).toLocaleString("es-CO")}`;
                    setFormData({ ...formData, Valorotrosingresos: formattedValue });
                  }}
                  maxLength="20"
                  placeholder="$ 0"
                  required
                />
                <Tooltip id="tooltip-Valorotrosingresos" place="top" effect="solid"> Por favor Diligencie el valor de los otros ingresos. </Tooltip>



                <label>Descripción de los Otros Ingresos* <span data-tooltip-id="tooltip-descrpcionotrosingresos" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="descrpcionotrosingresos"
                  value={formData.descrpcionotrosingresos}
                  onChange={(e) => setFormData({ ...formData, descrpcionotrosingresos: e.target.value })}
                  maxLength="200"
                  required
                />
                <Tooltip id="tooltip-descrpcionotrosingresos" place="top" effect="solid"> Por favor describa de donde provienen sus otros ingresos. </Tooltip>


              </>
            )}



            <label>Egresos Mensuales * <span data-tooltip-id="tooltip-egresosMensuales" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="egresosMensuales"
              value={formData.egresosMensuales}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Elimina todo excepto números
                const formattedValue = `$ ${parseInt(rawValue || 0).toLocaleString("es-CO")}`;
                setFormData({ ...formData, egresosMensuales: formattedValue });
              }}
              maxLength="20"
              placeholder="$ 0"
              required
            />
            {errores.egresosMensuales && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.egresosMensuales}</span>)}            
            <Tooltip id="tooltip-egresosMensuales" place="top" effect="solid"> Por favor Diligencie los egresos mensuales. </Tooltip>



            <label>Activos * <span data-tooltip-id="tooltip-activos" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="activos"
              value={formData.activos}
              onChange={handleFinancialChange}
              maxLength="20"
              placeholder="$ 0"
              required
            />   
            {errores.activos && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.activos}</span>)}            
            <Tooltip id="tooltip-activos" place="top" effect="solid"> Por favor Diligencie  los activos que tiene. </Tooltip>



            <label>Pasivos *<span data-tooltip-id="tooltip-pasivos" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="pasivos"
              value={formData.pasivos}
              onChange={handleFinancialChange}
              maxLength="20"
              placeholder="$ 0"
              required
            />   
            {errores.pasivos && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.pasivos}</span>)}            
            <Tooltip id="tooltip-pasivos" place="top" effect="solid"> Por favor Diligencie los pasivos que tenga. </Tooltip>



            <label>Patrimonio Neto *<span data-tooltip-id="tooltip-patrimonioNeto" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="patrimonioNeto"
              value={formData.patrimonioNeto}
              readOnly // ❗ Evita que el usuario lo modifique
              maxLength="20"
              placeholder="$ 0"
              required
            />
            <Tooltip id="tooltip-patrimonioNeto" place="top" effect="solid"> Este campo realizara la operacion de los activos - los pasivos. </Tooltip>

 

            <label>Origen de los Fondos *<span data-tooltip-id="tooltip-origenFondos" className="tooltip-icon" > ℹ️ </span></label>
            <input
              type="text"
              name="origenFondos"
              value={formData.origenFondos}
              onChange={handleChange}
              maxLength="200"
              required
            />
            {errores.origenFondos && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.origenFondos}</span>)}            
            <Tooltip id="tooltip-origenFondos" place="top" effect="solid"> Por favor indicar de donde provienen los fondos o recursos. </Tooltip>


          </>
        )}

        {/* Sección 4: Declaración de Impuestos */}
        {step === 4 && (
          <>
           

            <label>¿Sujeto a retención? * <span data-tooltip-id="tooltip-sujetoaretencion" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="sujetoaretencion"
              value={formData.sujetoaretencion}
              onChange={(e) => {
                const sujetoaretencion = e.target.value;
                
                setFormData({
                  ...formData,
                  sujetoaretencion,
                  ...(sujetoaretencion === "No" && {
                    resolucionautoretenedor: "",
                    agenteretenedor: "",
                    responsableiva: "",
                    grancontribuyente: "",
                    contribuyenterenta: "",
                    agenteretenedorica: "",
                    autoretenedor: "",
                    conceptoautoretenedor: "",
                  }),
                });
              }}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.sujetoaretencion && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.sujetoaretencion}</span>)}            
            <Tooltip id="tooltip-sujetoaretencion" place="top" effect="solid"> Seleccionar si esta sujerto o no a retencion. </Tooltip>



            {/* Mostrar solo si "Sujeto a retención" es "Sí" */}
            {formData.sujetoaretencion === "Si" && (
              <>


                <label>Resolución Autoretenedor</label>
                <input
                  type="text"
                  name="resolucionautoretenedor"
                  value={formData.resolucionautoretenedor}
                  onChange={handleChange}
                  maxLength="100"
                  required
                />



                <label>Agente Retenedor *</label>
                <select
                  name="agenteretenedor"
                  value={formData.agenteretenedor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>



                <label>Responsable de IVA*</label>
                <select
                  name="responsableiva"
                  value={formData.responsableiva}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>



                <label>Gran contribuyente*</label>
                <select
                  name="grancontribuyente"
                  value={formData.grancontribuyente}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>



                <label>Contribuyente de Renta*</label>
                <select
                  name="contribuyenterenta"
                  value={formData.contribuyenterenta}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>

                <label>Agente Retenedor de ICA*</label>
                <select
                  name="agenteretenedorica"
                  value={formData.agenteretenedorica}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>


               
                <label>Autoretenedor*</label>
                <select
                  name="autoretenedor"
                  value={formData.autoretenedor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>
             


                <label>Concepto Autoretenedor</label>
                <input
                  type="text"
                  name="conceptoautoretenedor"
                  value={formData.conceptoautoretenedor}
                  onChange={handleChange}
                  maxLength="100"
                  required
                />

              </>
            )}

            <label>¿Tiene Rendimiento Financiero? * <span data-tooltip-id="tooltip-Tienerendiminetofinanciero" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="Tienerendiminetofinanciero"
              value={formData.Tienerendiminetofinanciero}
              onChange={(e) => {
                const Tienerendiminetofinanciero = e.target.value;
                
                setFormData({
                  ...formData,
                  Tienerendiminetofinanciero,
                  ...(Tienerendiminetofinanciero === "No" && {
                    rendimientosfinancieros: "",
                    comision: "",
                    entidadfinancieradepagos: "",
                    numerodecuenta: "",
                    plazodepagos: "",
                    fechaUltimaDeclaracion: ""
                  }),
                });
              }}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.Tienerendiminetofinanciero && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.Tienerendiminetofinanciero}</span>)}            
            <Tooltip id="tooltip-Tienerendiminetofinanciero" place="top" effect="solid"> Seleccionar si esta sujerto o no a retencion. </Tooltip>

            {/* Mostrar solo si "Sujeto a retención" es "Sí" */}
            {formData.Tienerendiminetofinanciero === "Si" && (
              <>


            <label>Rendimientos Financieros*</label>
            <input
              type="text"
              name="rendimientosfinancieros"
              value={formData.rendimientosfinancieros}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Elimina todo excepto números
                const formattedValue = `$ ${parseInt(rawValue || 0).toLocaleString("es-CO")}`;
                setFormData({ ...formData, rendimientosfinancieros: formattedValue });
              }}
              maxLength="15"
              placeholder="$ 0"
              required
            />            



            <label>Comision*</label>
            <input
              type="text"
              name="comision"
              value={formData.comision}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Elimina todo excepto números
                const formattedValue = `$ ${parseInt(rawValue || 0).toLocaleString("es-CO")}`;
                setFormData({ ...formData, comision: formattedValue });
              }}
              maxLength="15"
              placeholder="$ 0"
              required
            />    


            
            <label>Entidad Financiera donde se realizan los Pagos</label>
            <input
              type="text" 
              name="entidadfinancieradepagos"
              value={formData.entidadfinancieradepagos}
              onChange={handleChange}
              maxLength="100"
            />  


            
            <label>Numero de Cuenta</label>
            <input
              type="number" 
              name="numerodecuenta"
              value={formData.numerodecuenta}
              onChange={handleChange}
              maxLength="100"
            />    


            
            <label>Plazo de Pagos "(en dias)"</label>
            <input
              type="number" 
              name="plazodepagos"
              value={formData.plazodepagos}
              onChange={handleChange}
              maxLength="100"
            />                                    

              </>
            )}  


            <label>¿Tiene productos financieros en el extranjero? *<span data-tooltip-id="tooltip-productosfinancierosextranjeros" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="productosfinancierosextranjeros"
              value={formData.productosfinancierosextranjeros}
              onChange={(e) => {
                const productosfinancierosextranjeros = e.target.value;

                setFormData({
                  ...formData,
                  productosfinancierosextranjeros,
                  indicarcual: productosfinancierosextranjeros === "Si" ? "" : "N/A", // Si es "No", deja "N/A"
                });
              }}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.productosfinancierosextranjeros && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.productosfinancierosextranjeros}</span>)}            
            <Tooltip id="tooltip-productosfinancierosextranjeros" place="top" effect="solid"> Por favor Diligencie si cuenta con algun producto financiero, como cuentas,CDTS, creditos, etc ... </Tooltip>



            {/* Mostrar campo solo si selecciona "Si" */}
            {formData.productosfinancierosextranjeros === "Si" && (
              <>


                <label>¿Indique cuál?</label>
                <input
                  type="text"
                  name="indicarcual"
                  value={formData.indicarcual}
                  onChange={(e) => setFormData({ ...formData, indicarcual: e.target.value })}
                  maxLength="100"
                  required
                />

              </>
            )}


            <hr />


            <label>¿Realiza transacciones en el extranjero? *<span data-tooltip-id="tooltip-transaccionesenelextranjero" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="transaccionesenelextranjero"
              value={formData.transaccionesenelextranjero}
              onChange={(e) => {
                const transaccionesenelextranjero = e.target.value;

                setFormData({
                  ...formData,
                  transaccionesenelextranjero,
                  indiquecual1: transaccionesenelextranjero === "Si" ? "" : "N/A", // Si es "No", deja "N/A"
                });
              }}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.transaccionesenelextranjero && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.transaccionesenelextranjero}</span>)}            
            <Tooltip id="tooltip-transaccionesenelextranjero" place="top" effect="solid"> Por favor Diligencie si tiene operaciones en el extranjero. </Tooltip>



            {/* Mostrar campo solo si selecciona "Si" */}
            {formData.transaccionesenelextranjero === "Si" && (
              <>

 
                <label>¿Indique cuál? *</label>
                <select
                  name="indiquecual1"
                  value={formData.indiquecual1}
                  onChange={(e) => setFormData({ ...formData, indiquecual1: e.target.value })}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Importaciones">Importaciones</option>
                  <option value="Pagos">Pagos</option>
                  <option value="Servicios">Servicios</option>
                  <option value="Préstamos">Préstamos</option>
                  <option value="Exportaciones">Exportaciones</option>
                  <option value="Inversiones">Inversiones</option>
                  <option value="Transferencias">Transferencias</option>
                  <option value="Otros">Otros</option>
                </select>

              </>
            )}


            <hr />

            <label>¿Tiene responsabilidad fiscal en un país diferente a Colombia? * <span data-tooltip-id="tooltip-responsabilidadfiscal" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="responsabilidadfiscal"
              value={formData.responsabilidadfiscal}
              onChange={(e) => {
                const responsabilidadfiscal = e.target.value;

                setFormData({
                  ...formData,
                  responsabilidadfiscal,
                  pais: responsabilidadfiscal === "Si" ? "" : "N/A", // Si es "No", deja "N/A"
                });
              }}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.responsabilidadfiscal && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.responsabilidadfiscal}</span>)}            
            <Tooltip id="tooltip-responsabilidadfiscal" place="top" effect="solid"> Por favor Diligencie si cuenta con alguna responsabilidad fiscal. </Tooltip>



            {/* Mostrar campo solo si selecciona "Si" */}
            {formData.responsabilidadfiscal === "Si" && (
              <>


                <label>País *<span data-tooltip-id="tooltip-pais" className="tooltip-icon"> ℹ️ </span></label>
                <select
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un país</option>
                  {Object.keys(data.Paises).map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>


              </>
            )}



          </>
        )}        

        {/* Sección 5: Información de PEP */}
        {step === 5 && formData.tipoPersona === "PN" && (
          <>


            <label>¿Es Usted o Algún Familiar una Persona Expuesta Políticamente (PEP)? * <span data-tooltip-id="tooltip-esPEP" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="esPEP"
              value={formData.esPEP}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.esPEP && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.esPEP}</span>)}            
            <Tooltip id="tooltip-esPEP" place="top" effect="solid"> Por favor Diligencie el nombre de la razon social  o nombre de la empresa. </Tooltip>



            {formData.esPEP === "Si" && (
              <>


                <label>Nombre Completo del PEP <span data-tooltip-id="tooltip-nombredelpep" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="nombredelpep"
                  value={formData.nombredelpep}
                  onChange={handleChange}
                  maxLength="100"
                />  
                <Tooltip id="tooltip-nombredelpep" place="top" effect="solid"> Por favor Diligencie el nombre del PEP que tiene relacion. </Tooltip>                
               


                <label>Tipo de Documento *<span data-tooltip-id="tooltip-tipoDocumentopep" className="tooltip-icon" > ℹ️ </span></label>
                <select
                  name="tipoDocumentopep"
                  value={formData.tipoDocumentopep}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="DNI">Documento Nacional de Identidad</option>
                  <option value="NIT">NIT</option>
                  <option value="SE">Sociedad Extranjera</option>

                </select>
                <Tooltip id="tooltip-tipoDocumentopep" place="top" effect="solid"> Por favor seleccione el tipo de documento del PEP. </Tooltip>



                <label> Número de Documento * <span data-tooltip-id="tooltip-numeroDocumentopep" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="numeroDocumentopep"
                  value={formData.numeroDocumentopep}
                  onChange={(e) => {
                    const nuevoValor = validarNumeroDocumento(formData.tipoDocumento, e.target.value);
                    setFormData({ ...formData, numeroDocumento: nuevoValor });
                  }}
                  maxLength="15"
                  required
                />
                <Tooltip id="tooltip-numeroDocumentopep" place="top" effect="solid"> Por favor Diligencie el numero de documento de identidad del PEP. </Tooltip>                


             
                <label>Nombre Entidad <span data-tooltip-id="tooltip-nombreentidad" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="nombreentidad"
                  value={formData.nombreentidad}
                  onChange={handleChange}
                  maxLength="100"
                />
                <Tooltip id="tooltip-nombreentidad" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                


                
                <label>Cargo o Rol del PEP Relacionado <span data-tooltip-id="tooltip-cargoPEP" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="cargoPEP"
                  value={formData.cargoPEP}
                  onChange={handleChange}
                  maxLength="100"
                />
                <Tooltip id="tooltip-cargoPEP" place="top" effect="solid"> Por favor Diligencie el cargo o el rol del PEP. </Tooltip>


                <label>Fecha de Vinculación al cargo*<span data-tooltip-id="tooltip-fechadevinculacionalcargo" className="tooltip-icon"> ℹ️ </span></label>
                <input
                  type="date"
                  name="fechadevinculacionalcargo"
                  value={formData.fechadevinculacionalcargo}
                  onChange={handleChange}
                  required
                />
                {errores.fechadevinculacionalcargo && (<span style={{ color: "red", fontSize: "12px", marginBottom: "20px", display: "block" }}>{errores.fechadediligenciamiento}</span>)}
                <Tooltip id="tooltip-fechadevinculacionalcargo" place="top" effect="solid">Se debe relacionar la fecha de diligenciamiento de este formulario</Tooltip>

                <label>Fecha de Desvinculación al cargo*<span data-tooltip-id="tooltip-fechadedesvinculacioncargo" className="tooltip-icon"> ℹ️ </span></label>
                <input
                  type="date"
                  name="fechadedesvinculacioncargo"
                  value={formData.fechadedesvinculacioncargo}
                  onChange={handleChange}
                  required
                />
                {errores.fechadedesvinculacioncargo && (<span style={{ color: "red", fontSize: "12px", marginBottom: "20px", display: "block" }}>{errores.fechadediligenciamiento}</span>)}
                <Tooltip id="tooltip-fechadedesvinculacioncargo" place="top" effect="solid">Se debe relacionar la fecha de diligenciamiento de este formulario</Tooltip>

                <label>¿Es Fideicomitente de patrimonios autonomos o fideicomisos que administren recursos públicos o alguno de sus relacionados de la persona juridica? * <span data-tooltip-id="tooltip-fideicomitentepat" className="tooltip-icon" > ℹ️ </span></label>
                <select
                  name="fideicomitentepat"
                  value={formData.fideicomitentepat}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>
                {errores.fideicomitentepat && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.esPEP}</span>)}            
                <Tooltip id="tooltip-fideicomitentepat" place="top" effect="solid"> Por favor Diligencie el nombre de la razon social  o nombre de la empresa. </Tooltip>

                  {formData.fideicomitentepat === "Si" && (
                    <>
                      <label>Entidad Fiduciaria<span data-tooltip-id="tooltip-EntidadFiduciaria" className="tooltip-icon" > ℹ️ </span></label>
                      <input
                        type="text"
                        name="EntidadFiduciaria"
                        value={formData.EntidadFiduciaria}
                        onChange={handleChange}
                        maxLength="100"
                      />
                      <Tooltip id="tooltip-EntidadFiduciaria" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                

                      <label>Entidad pública de la cual administra recursos públicos <span data-tooltip-id="tooltip-entidadpublica" className="tooltip-icon" > ℹ️ </span></label>
                      <input
                        type="text"
                        name="entidadpublica"
                        value={formData.entidadpublica}
                        onChange={handleChange}
                        maxLength="100"
                      />
                      <Tooltip id="tooltip-entidadpublica" place="top" effect="solid"> Por favor Diligencie el nombre de la entidad. </Tooltip>                

                      <label>Valor Administrado * <span data-tooltip-id="tooltip-valoradministrado" className="tooltip-icon" > ℹ️ </span></label>
                      <input
                        type="text"
                        name="valoradministrado"
                        value={formData.valoradministrado}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, ""); // Elimina todo excepto números
                          const formattedValue = `$ ${parseInt(rawValue || 0).toLocaleString("es-CO")}`;
                          setFormData({ ...formData, valoradministrado: formattedValue });
                        }}
                        maxLength="20"
                        placeholder="$ 0"
                        required
                      />
                      {errores.valoradministrado && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.ingresosMensuales}</span>)}            
                      <Tooltip id="tooltip-valoradministrado" place="top" effect="solid"> Por favor Diligencie sus ingresos mensuales. </Tooltip>



                    </>
                  )}


              </>
            )}
         
          </>
        )}

        {/* Sección 6: Información Comercial */}
        {step === 6 && (
          <>


            <label>¿Cuenta con Datos de contacto Comerciales? * <span data-tooltip-id="tooltip-datoscomerciales" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="datoscomerciales"
              value={formData.datoscomerciales}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.datoscomerciales && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.esPEP}</span>)}            
            <Tooltip id="tooltip-datoscomerciales" place="top" effect="solid"> Por favor Diligencie el nombre de la razon social  o nombre de la empresa. </Tooltip>



            {formData.datoscomerciales === "Si" && (
              <>


                <label>Nombre Completo de la Referencia Comercial <span data-tooltip-id="tooltip-nombrerefcom" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="nombrerefcom"
                  value={formData.nombrerefcom}
                  onChange={handleChange}
                  maxLength="100"
                />  
                <Tooltip id="tooltip-nombrerefcom" place="top" effect="solid"> Por favor Diligencie el nombre del PEP que tiene relacion. </Tooltip>                
               

                <label>Cargo <span data-tooltip-id="tooltip-cargorefcom" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="cargorefcom"
                  value={formData.nombrerefcom}
                  onChange={handleChange}
                  maxLength="100"
                />  
                <Tooltip id="tooltip-cargorefcom" place="top" effect="solid"> Por favor Diligencie el nombre del PEP que tiene relacion. </Tooltip>                
               
                <label>Teléfono Celular*<span data-tooltip-id="tooltip-telefonoCelularrefcom" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="telefonoCelularrefcom"
                  value={formData.telefonoCelularrefcom}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setFormData({ ...formData, telefonoCelularrefcom: value });
                    }
                  }}
                  pattern="\d*"
                  maxLength="10"
                  required
                />
                {errores.telefonoCelularrefcom && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.telefonoCelular}</span>)}            
                <Tooltip id="tooltip-telefonoCelularrefcom" place="top" effect="solid"> Por favor Diligencie su numero de telefono. </Tooltip>

                <label>Correo Electrónico *<span data-tooltip-id="tooltip-correoElectronicorefcom" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="email"
                  name="correoElectronicorefcom"
                  value={formData.correoElectronicorefcom}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, correoElectronicorefcom: value });
                  }}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es|net|org|edu|gov|co|mx|ar)$"
                  title="Debe ser un correo electrónico válido (e.g., ejemplo@dominio.com)"
                  required
                />
                {errores.correoElectronicorefcom && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.correoElectronico}</span>)}            
                <Tooltip id="tooltip-correoElectronicorefcom" place="top" effect="solid"> Por favor Diligencie el correo electronico personal. </Tooltip>

              </>
            )}


            <label>¿Cuenta con Datos de contacto Financiero? * <span data-tooltip-id="tooltip-datosfinancieros" className="tooltip-icon" > ℹ️ </span></label>
            <select
              name="datosfinancieros"
              value={formData.datosfinancieros}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            {errores.datosfinancieros && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.esPEP}</span>)}            
            <Tooltip id="tooltip-datosfinancieros" place="top" effect="solid"> Por favor Diligencie el nombre de la razon social  o nombre de la empresa. </Tooltip>



            {formData.datosfinancieros === "Si" && (
              <>


                <label>Nombre Completo de la Referencia Comercial <span data-tooltip-id="tooltip-nombrereffin" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="nombrereffin"
                  value={formData.nombrereffin}
                  onChange={handleChange}
                  maxLength="100"
                />  
                <Tooltip id="tooltip-nombrereffin" place="top" effect="solid"> Por favor Diligencie el nombre del PEP que tiene relacion. </Tooltip>                
               

                <label>Cargo <span data-tooltip-id="tooltip-cargoreffin" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="cargoreffin"
                  value={formData.cargoreffin}
                  onChange={handleChange}
                  maxLength="100"
                />  
                <Tooltip id="tooltip-cargoreffin" place="top" effect="solid"> Por favor Diligencie el nombre del PEP que tiene relacion. </Tooltip>                
               
                <label>Teléfono Celular*<span data-tooltip-id="tooltip-telefonoCelularreffin" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="text"
                  name="telefonoCelularreffin"
                  value={formData.telefonoCelularrefcom}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setFormData({ ...formData, telefonoCelularreffin: value });
                    }
                  }}
                  pattern="\d*"
                  maxLength="10"
                  required
                />
                {errores.telefonoCelularreffin && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.telefonoCelular}</span>)}            
                <Tooltip id="tooltip-telefonoCelularreffin" place="top" effect="solid"> Por favor Diligencie su numero de telefono. </Tooltip>

                <label>Correo Electrónico *<span data-tooltip-id="tooltip-correoElectronicoreffin" className="tooltip-icon" > ℹ️ </span></label>
                <input
                  type="email"
                  name="correoElectronicoreffin"
                  value={formData.correoElectronicoreffin}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, correoElectronicoreffin: value });
                  }}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es|net|org|edu|gov|co|mx|ar)$"
                  title="Debe ser un correo electrónico válido (e.g., ejemplo@dominio.com)"
                  required
                />
                {errores.correoElectronicoreffin && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.correoElectronico}</span>)}            
                <Tooltip id="tooltip-correoElectronicoreffin" place="top" effect="solid"> Por favor Diligencie el correo electronico personal. </Tooltip>

              </>
            )}            
         
          </>
        )}        


        {/* Sección 7: Autorizaciones */}
        {step === 7 && (
          <>
            <div className="switch-container">
              <label htmlFor="aceptaTerminos">Acepto Términos y Condiciones *<span data-tooltip-id="tooltip-aceptaTerminos" className="tooltip-icon" > ℹ️ </span></label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="aceptaTerminos"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={(e) => setFormData({ ...formData, aceptaTerminos: e.target.checked })}
                  required
                />
                <span className="slider round"></span>
              </label>
            </div>
            {errores.aceptaTerminos && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.aceptaTerminos}</span>)}            
            <Tooltip id="tooltip-aceptaTerminos" place="top" effect="solid"> Al aceptar los Términos y Condiciones, confirmas que has leído, comprendido y aceptas las reglas de uso del servicio, incluyendo el tratamiento de tus datos personales de acuerdo con nuestra política de privacidad. </Tooltip>


            <div className="switch-container">
              <label>Autorizo consultas en listas restrictivas *<span data-tooltip-id="tooltip-autorizaConsultas" className="tooltip-icon" > ℹ️ </span></label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="autorizaConsultas"
                  checked={formData.autorizaConsultas}
                  onChange={(e) =>
                    setFormData({ ...formData, autorizaConsultas: e.target.checked })
                  }
                  required
                />
                <span className="slider round"></span>
              </label>
            </div>
            {errores.autorizaConsultas && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.autorizaConsultas}</span>)}            
            <Tooltip id="tooltip-autorizaConsultas" place="top" effect="solid"> Al otorgar esta autorización, permites que se realicen verificaciones en listas restrictivas nacionales e internacionales (como OFAC, ONU, y otras entidades reguladoras) con el fin de garantizar el cumplimiento de normativas de prevención de lavado de activos y financiación del terrorismo.</Tooltip>


            <div className="switch-container">
              <label>Declaro que la información suministrada es verídica *<span data-tooltip-id="tooltip-declaraVeracidad" className="tooltip-icon" > ℹ️ </span></label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="declaraVeracidad"
                  checked={formData.declaraVeracidad}
                  onChange={(e) =>
                    setFormData({ ...formData, declaraVeracidad: e.target.checked })
                  }
                  required
                />
                <span className="slider round"></span>
              </label>
            </div>
            {errores.declaraVeracidad && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.declaraVeracidad}</span>)}            
            <Tooltip id="tooltip-declaraVeracidad" place="top" effect="solid"> Declaro que toda la información proporcionada en este formulario es veraz, completa y precisa. Entiendo que cualquier falsedad o inexactitud puede conllevar sanciones legales y/o la suspensión de mis servicios.</Tooltip>

            <div className="switch-container">
              <label>Declaracion de Persona Expuesta Politicamente*<span data-tooltip-id="tooltip-declaracionpep" className="tooltip-icon" > ℹ️ </span></label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="declaracionpep"
                  checked={formData.declaracionpep}
                  onChange={(e) =>
                    setFormData({ ...formData, declaracionpep: e.target.checked })
                  }
                  required
                />
                <span className="slider round"></span>
              </label>
            </div>
            {errores.declaracionpep && (<span style={{ color: "red", fontSize: "12px", marginTop: "0px", marginBottom: "20px", display: "block" }}>{errores.declaraVeracidad}</span>)}            
            <Tooltip id="tooltip-declaracionpep" place="top" effect="solid"> Confirmo si soy o he sido una Persona Expuesta Políticamente (PEP) o si tengo vínculos con alguien que lo sea. Esta información es requerida para cumplir con las normativas de prevención de lavado de activos y financiamiento del terrorismo.</Tooltip>

          </>
        )}

        {/* Botones */}
        <div className="button-container">
          {step > 0 && (
            <button type="button" onClick={handleBack}>
              Atrás
            </button>
          )}
          
          {step < sections.length - 1 ? (
            <button type="button" onClick={avanzarSeccion}>
              Continuar
            </button>
          ) : (
            <button type="submit" onClick={() => console.log("🖱️ Se hizo clic en Enviar")}>
              Enviar
            </button>
          )}
        </div>

      </form>
    </div>
  );  


};

export default App;
