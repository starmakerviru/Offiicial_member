// Function to generate profile URL
function generateProfileUrl(fromSid, userId = null) {
    const baseUrl = "https://m.starmakerstudios.com/d/profileinfo";
    const params = new URLSearchParams({
        from_sid: fromSid,
        type: "sing",
        color: "FE3A6A",
        shareTime: Math.floor(Date.now() / 1000).toString(),
        app_name: "sm",
        userId: userId || fromSid,
        cardKey: "Profile",
        pid: "Profire_share_B",
        showNavigation: "true",
        showBar: "1",
        share_type: "copyLink"
    });
    return `${baseUrl}?${params.toString()}`;
}

// Sample employee data - Replace with actual data from your API
const employees = [
    {
        name: "Nishmi",
        role: "Indian Official",
        id: "13271784945",
        image: "hello/Nishmi.jpg",
        userId: "13271784945",
        profileUrl: generateProfileUrl("13271784945", "13271784945")
    },
    {
        name: "Preethesh",
        role: "Indian Official",
        id: "13322410148",
        image: "hello/Preethesh.jpg",
        userId: "13322410148",
        profileUrl: generateProfileUrl("13322410148", "13322410148")
    },
    {
        name: "Aakshh",
        role: "Indian Official",
        id: "13273571742",
        image: "hello/Aakshh.jpg",
        userId: "13273571742",
        profileUrl: generateProfileUrl("13273571742", "13273571742")
    },
    {
        name: "Vishwajit",
        role: "Indian Official",
        id: "100085228882",
        image: "hello/Vishwajit.jpg",
        userId: "100085228882",
        profileUrl: generateProfileUrl("100085228882", "100085228882")
    },
    {
        name: "Secret",
        role: "Indian Official",
        id: "62182621638",
        image: "hello/Secret.jpg",
        userId: "62182621638",
        profileUrl: generateProfileUrl("62182621638", "62182621638")
    },
    {
        name: "Ayush",
        role: "Indian Official",
        id: "78004411724",
        image: "hello/Ayush.jpg",
        userId: "12384898984835462",
        profileUrl: "https://m.starmakerstudios.com/d/profileinfo?from_sid=78004411724&type=sing&color=FE3A6A&shareTime=1760857998&app_name=sm&userId=12384898984835462&cardKey=Profile&pid=Profire_share_B&showNavigation=true&showBar=1&share_type=copyLink"
    },
    {
        name: "Aahana",
        role: "Indian Official",
        id: "100090141811",
        image: "hello/Aahana.jpg",
        userId: "100090141811",
        profileUrl: generateProfileUrl("100090141811", "100090141811")
    },
    {
        name: "Jaani",
        role: "Indian Official",
        id: "13377553150",
        image: "hello/Jaani.jpg",
        userId: "13377553150",
        profileUrl: generateProfileUrl("13377553150", "13377553150")
    },
    {
        name: "Abhi",
        role: "Indian Official",
        id: "62021359401",
        image: "hello/Abhi.jpg",
        userId: "62021359401",
        profileUrl: generateProfileUrl("62021359401", "62021359401")
    },
    {
        name: "Mr.Raj",
        role: "Indian Official",
        id: "100075537624",
        image: "hello/Mr.Raj.jpg",
        userId: "100075537624",
        profileUrl: generateProfileUrl("100075537624", "100075537624")
    }
];

// Function to render employees
function renderEmployees() {
    const grid = document.getElementById('employeesGrid');
    
    if (!grid) return;
    
    if (employees.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <p>No employees to display at this time.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = employees.map(employee => `
        <div class="employee-card" onclick="window.open('${employee.profileUrl}', '_blank')" style="cursor: pointer;">
            <div class="employee-avatar">
                <img src="${employee.image}" alt="${employee.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Crect fill=\'%23f04e7b\' width=\'120\' height=\'120\'/%3E%3Ctext fill=\'%23fff\' font-size=\'48\' font-weight=\'600\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\'%3E${employee.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="employee-info">
                <div class="employee-name">${employee.name}</div>
                <div class="employee-role">${employee.role}</div>
                <div class="employee-id">${employee.id}</div>
            </div>
        </div>
    `).join('');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', renderEmployees);

// If you want to load employees from an API, uncomment and modify this:
/*
async function loadEmployees() {
    try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        employees = data;
        renderEmployees();
    } catch (error) {
        console.error('Error loading employees:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadEmployees);
*/

