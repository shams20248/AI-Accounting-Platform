import { useState } from 'react'
import {
  ArrowDownLeft, ArrowUpLeft, Bell, Bot, BriefcaseBusiness, ChevronDown,
  ChevronLeft, CircleHelp, FileBarChart, FileText, LayoutDashboard, Menu,
  MoreHorizontal, Plus, Search, Settings, Sparkles, TrendingUp, Users,
  WalletCards, X, Zap
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const chartData = [
  { month: 'يناير', income: 28000, expense: 15000 }, { month: 'فبراير', income: 35000, expense: 19000 },
  { month: 'مارس', income: 31000, expense: 17000 }, { month: 'أبريل', income: 42000, expense: 21000 },
  { month: 'مايو', income: 39000, expense: 24000 }, { month: 'يونيو', income: 51000, expense: 27000 },
]

const invoices = [
  { id: '#INV-2406', client: 'شركة المدار للتقنية', date: '24 يونيو 2024', amount: '12,500 ر.س', status: 'مدفوعة', tone: 'success' },
  { id: '#INV-2405', client: 'مؤسسة آفاق التجارية', date: '22 يونيو 2024', amount: '8,750 ر.س', status: 'قيد الانتظار', tone: 'warning' },
  { id: '#INV-2404', client: 'شركة نواة الإبداع', date: '20 يونيو 2024', amount: '5,200 ر.س', status: 'متأخرة', tone: 'danger' },
  { id: '#INV-2403', client: 'استوديو لون', date: '18 يونيو 2024', amount: '3,800 ر.س', status: 'مدفوعة', tone: 'success' },
]

const navItems = [
  { label: 'نظرة عامة', icon: LayoutDashboard }, { label: 'المعاملات', icon: WalletCards },
  { label: 'الفواتير', icon: FileText, count: '12' }, { label: 'العملاء', icon: Users },
  { label: 'التقارير', icon: FileBarChart },
]

function App() {
  const [active, setActive] = useState('نظرة عامة')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Sparkles size={19} /></div><span>دفتر</span><button className="close-menu" onClick={() => setSidebarOpen(false)}><X size={18}/></button></div>
      <div className="workspace"><div className="workspace-avatar">س</div><div><strong>شركة سحاب</strong><small>الحساب الرئيسي</small></div><ChevronDown size={16} /></div>
      <div className="menu-label">القائمة الرئيسية</div>
      <nav>{navItems.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => {setActive(label); setSidebarOpen(false)}}><Icon size={19}/><span>{label}</span>{count && <b>{count}</b>}</button>)}</nav>
      <div className="menu-label bottom-label">إدارة الحساب</div>
      <nav><button className="nav-item"><Settings size={19}/><span>الإعدادات</span></button><button className="nav-item"><CircleHelp size={19}/><span>مركز المساعدة</span></button></nav>
      <div className="sidebar-footer"><div className="upgrade-icon"><Zap size={16}/></div><div><strong>طوّر حسابك</strong><small>استكشف مزايا دفتر Pro</small></div><ChevronLeft size={16}/></div>
      <div className="user-profile"><div className="user-avatar">م</div><div><strong>محمد السالم</strong><small>مدير الحساب</small></div><MoreHorizontal size={18}/></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="menu-button" onClick={() => setSidebarOpen(true)}><Menu size={21}/></button><div className="breadcrumbs"><span>الرئيسية</span><ChevronLeft size={15}/><strong>{active}</strong></div><div className="top-actions"><div className="search"><Search size={17}/><input placeholder="ابحث في دفتر..." /></div><button className="icon-button notification" onClick={() => setShowNotification(!showNotification)}><Bell size={19}/><i></i></button><div className="top-avatar">م</div></div>{showNotification && <div className="notification-pop"><strong>الإشعارات</strong><p>لديك فاتورة متأخرة تحتاج للمراجعة.</p></div>}</header>
      <div className="page-content">
        <div className="page-heading"><div><p className="eyebrow">الأحد، 30 يونيو 2024</p><h1>صباح الخير، محمد <span>👋</span></h1><p className="subheading">إليك ملخص أداء شركتك لهذا الشهر.</p></div><button className="primary-button"><Plus size={18}/>معاملة جديدة</button></div>
        <section className="stats-grid">
          <StatCard title="الرصيد الحالي" value="128,450" suffix="ر.س" change="+12.5%" icon={WalletCards} color="purple" positive /><StatCard title="إجمالي الدخل" value="51,280" suffix="ر.س" change="+8.2%" icon={ArrowDownLeft} color="green" positive /><StatCard title="إجمالي المصروفات" value="27,430" suffix="ر.س" change="-3.1%" icon={ArrowUpLeft} color="orange" positive /><StatCard title="صافي الربح" value="23,850" suffix="ر.س" change="+18.4%" icon={TrendingUp} color="blue" positive />
        </section>
        <div className="dashboard-grid"><section className="card chart-card"><div className="card-header"><div><h2>التدفق النقدي</h2><p>نظرة على دخلك ومصروفاتك خلال آخر 6 أشهر</p></div><button className="select-button">آخر 6 أشهر <ChevronDown size={15}/></button></div><div className="legend"><span><i className="dot income"></i>الدخل</span><span><i className="dot expense"></i>المصروفات</span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{top: 10, right: 5, left: -15, bottom: 0}}><defs><linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c5cfc" stopOpacity={.2}/><stop offset="95%" stopColor="#7c5cfc" stopOpacity={0}/></linearGradient><linearGradient id="expense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#39b98a" stopOpacity={.15}/><stop offset="95%" stopColor="#39b98a" stopOpacity={0}/></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef0f5"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#99a1b3'}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#99a1b3'}} tickFormatter={(v) => `${v/1000}k`} orientation="right"/><Tooltip formatter={(value) => [`${Number(value).toLocaleString()} ر.س`, '']} contentStyle={{border: 'none', borderRadius: 12, boxShadow: '0 8px 25px #26314b18', fontFamily: 'inherit', fontSize: 12}}/><Area type="monotone" dataKey="income" stroke="#7c5cfc" strokeWidth={2.5} fill="url(#income)"/><Area type="monotone" dataKey="expense" stroke="#39b98a" strokeWidth={2.5} fill="url(#expense)"/></AreaChart></ResponsiveContainer></div></section>
          <section className="card insight-card"><div className="insight-title"><div className="ai-icon"><Bot size={20}/></div><div><h2>رؤى دفتر الذكية</h2><p>تحليل آلي لأداء نشاطك</p></div><span className="live-dot">● مباشر</span></div><div className="insight-main"><div className="insight-badge"><TrendingUp size={18}/></div><div><strong>أداء رائع هذا الشهر!</strong><p>صافي ربحك ارتفع بنسبة <b>18.4%</b> مقارنة بالشهر الماضي.</p></div></div><div className="insight-row"><div className="mini-icon violet"><ArrowDownLeft size={16}/></div><div><strong>فرصة نمو</strong><p>دخلك من العملاء المتكررين يمثل 64% من إجمالي الدخل.</p></div></div><div className="insight-row"><div className="mini-icon amber"><Bell size={16}/></div><div><strong>تنبيه مهم</strong><p>لديك 8,750 ر.س في فواتير مستحقة خلال هذا الأسبوع.</p></div></div><button className="text-button">عرض التحليل الكامل <ChevronLeft size={16}/></button></section></div>
        <section className="card transactions-card"><div className="card-header"><div><h2>آخر الفواتير</h2><p>تابع حالة فواتيرك ومعاملاتك الأخيرة</p></div><button className="outline-button">عرض الكل <ChevronLeft size={15}/></button></div><div className="table-wrap"><table><thead><tr><th>رقم الفاتورة</th><th>العميل</th><th>تاريخ الإصدار</th><th>المبلغ</th><th>الحالة</th><th></th></tr></thead><tbody>{invoices.map(inv => <tr key={inv.id}><td><strong className="invoice-id">{inv.id}</strong></td><td><div className="client"><span>{inv.client.charAt(0)}</span>{inv.client}</div></td><td className="muted">{inv.date}</td><td><strong>{inv.amount}</strong></td><td><span className={`status ${inv.tone}`}>{inv.status}</span></td><td><button className="more"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div></section>
        <footer><span>© 2024 دفتر. جميع الحقوق محفوظة.</span><span>آخر مزامنة: منذ دقيقتين</span></footer>
      </div>
    </main>
  </div>
}

function StatCard({title, value, suffix, change, icon: Icon, color, positive}: {title:string, value:string, suffix:string, change:string, icon:typeof WalletCards, color:string, positive?:boolean}) { return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={19}/></div><div className="stat-info"><p>{title}</p><div className="stat-value">{value} <small>{suffix}</small></div><span className={positive ? 'positive' : ''}>{change} <small>من الشهر الماضي</small></span></div><div className="sparkline"><span></span><span></span><span></span><span></span><span></span><span></span></div></div> }

export default App
