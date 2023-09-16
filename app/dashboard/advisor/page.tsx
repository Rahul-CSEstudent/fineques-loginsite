const Dashboard: React.FC = () => {

    return (
      <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="ADVICER - DAILY REPORT"
        style={{ width: '100%', height: '100%' }}
        src="https://app.powerbi.com/reportEmbed?reportId=611f0baf-1a6b-4d81-9500-abc3afd293cc&autoAuth=true&ctid=d2c967e6-4fc7-452c-9e79-f78c68ccf915"
        allowFullScreen
      ></iframe>
    </div>
    )
  };
  
  export default Dashboard;