package com.example.frontfollowup.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

// 1. Asignamos nuestras variables de Color.kt al esquema claro
private val EsquemaClaro = lightColorScheme(
    primary = ColorPrimario,
    secondary = ColorSecundario,
    tertiary = ColorTerciario,
    background = ColorFondo,
    surface = ColorSuperficie,
    error = ColorError,
    onPrimary = TextoSobrePrimario,
    onBackground = TextoSobreFondo,
    onSurface = TextoSobreFondo
)

// 2. Esquema oscuro (Opcional por ahora, usa los mismos colores o ajustados)
private val EsquemaOscuro = darkColorScheme(
    primary = ColorPrimario,
    secondary = ColorSecundario,
    // ... puedes definir colores invertidos para el modo oscuro luego
)

// 3. La función principal que envolverá toda tu App
@Composable
fun EduManageTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) EsquemaOscuro else EsquemaClaro

    // (Opcional) Esto pinta la barra de estado superior del celular (donde va la hora y batería)
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = darkTheme
        }
    }

    // Aquí se inyectan los Colores y la Tipografía a Material Design 3
    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography, // Llama a la variable que creaste en Type.kt
        content = content
    )
}