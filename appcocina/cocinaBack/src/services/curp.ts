interface DatosCURP {
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  fechaDeNacimiento: string;
  sexo: string;
  estado: string;
}

export async function generarCURP({
  nombres,
  primerApellido,
  segundoApellido,
  fechaDeNacimiento,
  sexo,
  estado,
}: DatosCURP): Promise<string> {
  const headers = new Headers({
    accept: "application/json",
    "Content-Type": "application/json",
  });

  const body = JSON.stringify({
    nombres,
    primerApellido,
    segundoApellido,
    fechaDeNacimiento,
    sexo,
    estado,
  });

  const response = await fetch("https://utilidades.vmartinez84.xyz/api/Curp", {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error al generar CURP:", error);
    throw error;
  }

  const result = await response.json();
  return result.curp;
}
