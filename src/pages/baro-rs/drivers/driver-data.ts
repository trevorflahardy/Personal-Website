export interface DriverData {
    id: string;
    name: string;
    fullName: string;
    repo: string;
    tagline: string;
    description: string;
    color: string;
    icon: string;
    protocol: string;
    keyMetric: string;
    i2cAddress?: string;
    features: string[];
    measurements?: { name: string; unit: string; range?: string }[];
    usedInBaroRs: string;
    codeExample: string;
}

export const drivers: Record<string, DriverData> = {
    'bh1750': {
        id: 'bh1750',
        name: 'BH1750',
        fullName: 'BH1750 Ambient Light Sensor',
        repo: 'https://github.com/trevorflahardy/bh1750-embedded',
        tagline: 'Platform-agnostic driver for ambient light sensing with configurable measurement modes.',
        description: 'A no_std Rust driver for the BH1750/BH1750FVI ambient light sensor. Provides both blocking and async APIs built on embedded-hal 1.0 traits, making it portable across any embedded platform. Supports continuous and one-time measurement modes with configurable resolution.',
        color: '#eab308',
        icon: 'pi-sun',
        protocol: 'I²C',
        keyMetric: '1-65535 lux',
        i2cAddress: '0x23 / 0x5C',
        features: [
            'Blocking API via embedded-hal 1.0 I2C + DelayNs traits',
            'Optional async API via embedded-hal-async feature flag',
            'Continuous and one-time measurement modes',
            'High, medium, and low resolution settings',
            'Configurable measurement time register',
            'Clean reimplementation for modern embedded-hal',
        ],
        measurements: [
            { name: 'Illuminance', unit: 'lux', range: '1 - 65,535 lux' },
        ],
        usedInBaroRs: 'Planned integration for ambient light monitoring — enabling automatic display brightness adjustment and daylight cycle tracking in long-term environmental data.',
        codeExample: `use bh1750_embedded::BH1750;

// Initialize the sensor on I²C bus
let mut sensor = BH1750::new(i2c, Address::Low);

// Start continuous high-resolution measurement
sensor.set_mode(Mode::ContinuousHighRes)?;

// Read ambient light level
let lux = sensor.read_lux(&mut delay)?;
println!("Light: {} lux", lux);`,
    },
    'scd41': {
        id: 'scd41',
        name: 'SCD41',
        fullName: 'SCD41 CO₂ / Temperature / Humidity Sensor',
        repo: 'https://github.com/trevorflahardy/scd41-embedded',
        tagline: 'Sensirion CO₂ sensor driver with periodic measurement and data readiness polling.',
        description: 'A no_std Rust driver for the Sensirion SCD41 — a true CO₂ sensor that uses photoacoustic sensing (not estimated eCO₂). Measures carbon dioxide concentration alongside temperature and relative humidity. Supports periodic measurement mode with data readiness polling via both blocking and async APIs.',
        color: '#22c55e',
        icon: 'pi-cloud',
        protocol: 'I²C',
        keyMetric: '0-40,000 ppm CO₂',
        i2cAddress: '0x62',
        features: [
            'Blocking API via embedded-hal 1.0 I2C + DelayNs traits',
            'Optional async API via embedded-hal-async feature flag',
            'Periodic measurement mode with configurable intervals',
            'Data readiness polling before reads',
            'True photoacoustic CO₂ sensing (not eCO₂)',
            'Combined CO₂, temperature, and humidity output',
        ],
        measurements: [
            { name: 'CO₂', unit: 'ppm', range: '0 - 40,000 ppm' },
            { name: 'Temperature', unit: '°C', range: '-10 - 60 °C' },
            { name: 'Humidity', unit: '%RH', range: '0 - 100%' },
        ],
        usedInBaroRs: 'Planned integration for indoor air quality monitoring — tracking CO₂ concentration to assess ventilation quality alongside temperature and humidity baselines.',
        codeExample: `use scd41_embedded::SCD41;

// Initialize the CO₂ sensor
let mut sensor = SCD41::new(i2c);

// Start periodic measurements
sensor.start_periodic_measurement(&mut delay)?;

// Wait for data, then read
if sensor.data_ready(&mut delay)? {
    let data = sensor.read_measurement(&mut delay)?;
    println!("CO₂: {} ppm", data.co2);
    println!("Temp: {} °C", data.temperature);
    println!("RH: {} %", data.humidity);
}`,
    },
    'axp2101': {
        id: 'axp2101',
        name: 'AXP2101',
        fullName: 'AXP2101 Power Management IC',
        repo: 'https://github.com/trevorflahardy/axp2101-embedded',
        tagline: 'Complete PMIC driver — power rails, battery charging, ADC, interrupts, and watchdog.',
        description: 'A comprehensive no_std Rust driver for the AXP2101 Power Management IC. Provides full control over 5 DCDC converters, 10 LDO regulators, battery charging with configurable parameters, ADC measurements, interrupt handling, watchdog timer, and power sequencing. Every register is type-safe with datasheet references.',
        color: '#ef4444',
        icon: 'pi-bolt',
        protocol: 'I²C',
        keyMetric: '15 power rails',
        i2cAddress: '0x34',
        features: [
            'Full power rail control — DCDC1-5, ALDO1-4, BLDO1-2, DLDO1-2, CPUSLDO',
            'Battery charging with configurable current and voltage',
            'ADC measurements — battery voltage, percentage, VBUS, temperature',
            'Complete interrupt handling with per-source masking',
            'Watchdog timer configuration',
            'Power sequencing and PWROK signal management',
            'Button battery charge support',
            'Async API via embedded-hal-async',
        ],
        measurements: [
            { name: 'Battery Voltage', unit: 'V', range: '2.6 - 4.2 V' },
            { name: 'Battery Level', unit: '%', range: '0 - 100%' },
            { name: 'VBUS Voltage', unit: 'V' },
            { name: 'Die Temperature', unit: '°C' },
        ],
        usedInBaroRs: 'Core integration in the M5Stack CoreS3 SE — manages all power rails for the LCD backlight, sensor bus, SD card, and processor. Enables battery monitoring and graceful shutdown sequences.',
        codeExample: `use axp2101_embedded::AXP2101;

// Initialize the PMIC
let mut pmic = AXP2101::new(i2c);

// Enable LCD backlight power rail
pmic.set_aldo3_voltage(3300)?; // 3.3V
pmic.enable_aldo3(true)?;

// Read battery status
let voltage = pmic.battery_voltage()?;
let percent = pmic.battery_percentage()?;
println!("Battery: {}V ({}%)", voltage, percent);`,
    },
    'tca9548a': {
        id: 'tca9548a',
        name: 'TCA9548A',
        fullName: 'TCA9548A 8-Channel I²C Multiplexer',
        repo: 'https://github.com/trevorflahardy/tca9548a-embedded',
        tagline: 'I²C switch driver with virtual per-channel bus abstraction for sensor expansion.',
        description: 'A no_std Rust driver for the TCA9548A 8-channel I²C switch/multiplexer. Enables connecting up to 8 separate I²C buses through a single host port — allowing multiple devices with the same I²C address to coexist. Features a split() API that provides virtual I²C bus handles for each channel.',
        color: '#3b82f6',
        icon: 'pi-sitemap',
        protocol: 'I²C',
        keyMetric: '8 channels',
        i2cAddress: '0x70 - 0x77',
        features: [
            'Blocking API via embedded-hal 1.0 I2C traits',
            'Optional async API via embedded-hal-async',
            'Virtual I²C bus per channel via split() API',
            'Channel selection via bitmask (multi-channel simultaneously)',
            'Resolve I²C address conflicts between same-address devices',
            'Up to 8 multiplexers chainable for 64 channels',
        ],
        usedInBaroRs: 'Enables sensor expansion beyond the single I²C bus — allowing multiple sensors with overlapping addresses to coexist on separate channels. Critical infrastructure for scaling to 20+ sensors on the custom PCB.',
        codeExample: `use tca9548a_embedded::TCA9548A;

// Initialize the I²C multiplexer
let mut mux = TCA9548A::new(i2c, Address::Default);

// Select channel 0
mux.select_channel(0)?;

// Or use the split API for per-channel handles
let channels = mux.split();
let mut sensor_a = SHT40::new(channels.ch0);
let mut sensor_b = SHT40::new(channels.ch1);`,
    },
    'ft6336u': {
        id: 'ft6336u',
        name: 'FT6336U',
        fullName: 'FT6336U Capacitive Touch Controller',
        repo: 'https://github.com/trevorflahardy/ft6336u-driver',
        tagline: 'Multi-touch driver with gesture detection, power management, and interrupt support.',
        description: 'A no_std Rust driver for the FT6336U capacitive touch screen controller. Supports up to 2 simultaneous touch points with full gesture detection (swipe, zoom, tap). Includes power management modes, interrupt-driven or polling operation, and comprehensive register access for fine-tuning touch sensitivity.',
        color: '#a855f7',
        icon: 'pi-tablet',
        protocol: 'I²C',
        keyMetric: '2-point multi-touch',
        i2cAddress: '0x38',
        features: [
            'Multi-touch support — up to 2 simultaneous touch points',
            'Built-in gesture detection (swipe, zoom, tap)',
            'Power management — active, monitor, and hibernate modes',
            'Interrupt-driven or polling operation modes',
            'Touch event tracking (press, stream, release)',
            'Comprehensive register API for sensitivity tuning',
            'Async API via embedded-hal-async',
        ],
        measurements: [
            { name: 'Touch X', unit: 'px', range: '0 - 319' },
            { name: 'Touch Y', unit: 'px', range: '0 - 239' },
            { name: 'Touch Weight', unit: 'pressure' },
        ],
        usedInBaroRs: 'Core input device for the M5Stack CoreS3 SE — handles all touch-based navigation through historical data views, time scale selection, and system configuration on the 320×240 LCD.',
        codeExample: `use ft6336u_driver::FT6336U;

// Initialize touch controller
let mut touch = FT6336U::new(i2c);

// Read touch state
let state = touch.read_touch_state()?;
if state.touch_points > 0 {
    let p1 = state.point1;
    println!("Touch at ({}, {})", p1.x, p1.y);
}

// Check for gestures
if let Some(gesture) = touch.read_gesture()? {
    println!("Gesture: {:?}", gesture);
}`,
    },
    'aw9523': {
        id: 'aw9523',
        name: 'AW9523',
        fullName: 'AW9523 GPIO Expander & LED Driver',
        repo: 'https://github.com/trevorflahardy/aw9523-embedded',
        tagline: '16-channel GPIO expander with 256-step constant current LED control.',
        description: 'A no_std Rust driver for the AW9523 16-channel GPIO expander and LED driver. Each of the 16 pins can be independently configured as digital input, digital output, or LED mode with 256-step constant current brightness control. Supports interrupt generation, bulk port operations, and configurable output modes.',
        color: '#06b6d4',
        icon: 'pi-lightbulb',
        protocol: 'I²C',
        keyMetric: '16 GPIO + 256-step LED',
        i2cAddress: '0x58 - 0x5B',
        features: [
            '16 GPIO pins — individually configurable as input, output, or LED',
            '256-step constant current LED brightness control',
            'Port 0: configurable open-drain or push-pull output',
            'Port 1: push-pull output',
            'Per-pin interrupt enable/disable',
            'Bulk 16-bit port read/write operations',
            'Async API via embedded-hal-async',
        ],
        usedInBaroRs: 'Integrated in the M5Stack CoreS3 SE for additional GPIO control — manages the touch controller reset line, interrupt routing, and status LED indicators that extend beyond the ESP32-S3\'s native GPIO count.',
        codeExample: `use aw9523_embedded::{AW9523, PinMode};

// Initialize GPIO expander
let mut gpio = AW9523::new(i2c, Address::Default);

// Configure pin as output
gpio.set_pin_mode(0, PinMode::Output)?;
gpio.write_pin(0, true)?;

// Configure pin as LED with brightness
gpio.set_pin_mode(4, PinMode::Led)?;
gpio.set_led_brightness(4, 128)?; // 50% brightness`,
    },
};
