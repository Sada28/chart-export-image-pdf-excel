import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  Button
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Picker } from '@react-native-picker/picker';
import RNFetchBlob from 'rn-fetch-blob'; // 👈 Must install this

const screenWidth = Dimensions.get("window").width;

const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartData = [120, 1500, 180, 170, 900, 260, 300, 2820, 320, 340, 390, 820]; // Number of Deliveries


const LineChartapp = () => {
  const viewShotRef = useRef();
  const [selectedFormat, setSelectedFormat] = useState('image');

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const scanFile = async (path, mimeType) => {
    try {
      await RNFetchBlob.fs.scanFile([{ path, mime: mimeType }]);
      console.log("Media scanner done for:", path);
    } catch (err) {
      console.log("Media scan error:", err);
    }
  };

  const downloadChart = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    if (selectedFormat === 'image') {
      const uri = await viewShotRef.current.capture();
      const filePath = `${RNFS.DownloadDirectoryPath}/chart_${Date.now()}.png`;
      await RNFS.moveFile(uri, filePath);
      await scanFile(filePath, 'image/png');
      Alert.alert("✅ Image Saved", `Saved at:\n${filePath}`);
    }

    if (selectedFormat === 'pdf') {
      try {
        const htmlContent = `
      <html>
      <body>
        <h1>Chart Report</h1>
        <table border="1" style="width:100%">
          <tr>${chartLabels.map(l => `<th>${l}</th>`).join('')}</tr>
          <tr>${chartData.map(d => `<td>${d}</td>`).join('')}</tr>
        </table>
      </body>
      </html>`;

        const fileName = `chart_pdf_${Date.now()}.pdf`;
        const fullPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

        const pdf = await RNHTMLtoPDF.convert({
          html: htmlContent,
          fileName: fileName.replace('.pdf', ''), // remove extension here
          directory: 'Download' // forces it to use RNFS.DownloadDirectoryPath
        });

        if (pdf.filePath && await RNFS.exists(pdf.filePath)) {
          // Move PDF to public Downloads if it's not already
          if (pdf.filePath !== fullPath) {
            await RNFS.moveFile(pdf.filePath, fullPath);
          }

          await RNFetchBlob.fs.scanFile([{ path: fullPath, mime: 'application/pdf' }]);
          Alert.alert("✅ PDF Saved", `Saved at:\n${fullPath}`);
        } else {
          Alert.alert("❌ Error", "PDF not created properly.");
        }
      } catch (err) {
        console.log("PDF Save Error", err);
        Alert.alert("❌ Error", "Something went wrong while saving PDF.");
      }
    }


    if (selectedFormat === 'csv') {
      const csv = `${chartLabels.join(',')}\n${chartData.join(',')}`;
      const path = `${RNFS.DownloadDirectoryPath}/chart_${Date.now()}.csv`;
      await RNFS.writeFile(path, csv, 'utf8');
      await scanFile(path, 'text/csv');
      Alert.alert("✅ CSV Saved", `Saved at:\n${path}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Line Chart</Text>

      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
        <LineChart
          data={{ labels: chartLabels, datasets: [{ data: chartData }] }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#f5f5f5",
            backgroundGradientTo: "#e0e0e0",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 10 }}
        />
      </ViewShot>

      <Text style={styles.label}>Select Format:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFormat}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedFormat(itemValue)}
        >
          <Picker.Item label="📷 Image (PNG)" value="image" />
          <Picker.Item label="📄 PDF File" value="pdf" />
          <Picker.Item label="📊 Excel/CSV" value="csv" />
        </Picker>
      </View>

      <Button title="Download Chart" onPress={downloadChart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40, backgroundColor: "#fff" },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 10 },
  label: { marginTop: 20, marginBottom: 5, fontWeight: 'bold' },
  pickerContainer: { borderWidth: 1, borderColor: '#aaa', borderRadius: 5, marginBottom: 10 },
  picker: { height: 50, width: '100%' }
});

export default LineChartapp;