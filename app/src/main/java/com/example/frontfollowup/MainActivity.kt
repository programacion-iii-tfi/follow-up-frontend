package com.example.frontfollowup

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.frontfollowup.ui.theme.EduManageTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            // Envolvemos toda la app con nuestro Sistema de Diseño
            EduManageTheme {
                // Surface actúa como el fondo de la pantalla y toma el "ColorFondo" automáticamente
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    PantallaDePrueba()
                }
            }
        }
    }
}

@Composable
fun PantallaDePrueba() {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Este texto debería tomar la tipografía grande y el color oscuro
        Text(
            text = "¡El Tema Funciona!",
            style = MaterialTheme.typography.headlineLarge,
            color = MaterialTheme.colorScheme.onBackground
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Este botón debería pintarse solo con tu ColorPrimario (Morado)
        Button(onClick = { /* No hace nada aún */ }) {
            Text(text = "Probar Botón")
        }
    }
}

// Esto le dice a Android Studio que dibuje la vista previa en el panel derecho
@Preview(showBackground = true)
@Composable
fun PantallaDePruebaPreview() {
    EduManageTheme {
        PantallaDePrueba()
    }
}