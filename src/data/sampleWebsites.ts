import { SampleScenario } from '../types/scraper';

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'laptops-ecommerce',
    title: 'NexTech Store - Laptops & Ultrabooks',
    category: 'E-Commerce Catalog',
    icon: 'Laptop',
    description: 'Directly addresses the prompt scenario: extract laptop names, prices, ratings, and technical specs.',
    defaultPrompt: 'Mujhe is e-commerce site se saare laptops ke naam, price, specs, rating aur in-stock status extract kar ke clean JSON mein do.',
    sourceUrl: 'https://store.nextech-hardware.io/category/laptops',
    traditionalSelectors: {
      item: 'div.product-card',
      title: 'h2.product-title',
      price: 'span.price-current',
      specs: 'ul.specs-list > li',
      rating: 'span.rating-score',
      stock: 'span.stock-status'
    },
    sampleRecords: [
      {
        laptop_name: 'MacBook Pro 16" M3 Max',
        brand: 'Apple',
        price_usd: 3499,
        specs: 'Apple M3 Max (16-core CPU, 40-core GPU), 36GB Unified RAM, 1TB NVMe SSD, 16.2" Liquid Retina XDR 120Hz',
        rating: 4.9,
        in_stock: true,
        warranty_years: 2
      },
      {
        laptop_name: 'Dell XPS 16 OLED Titanium',
        brand: 'Dell',
        price_usd: 2699,
        specs: 'Intel Core Ultra 9 185H, RTX 4070 8GB, 32GB LPDDR5X, 2TB PCIe 4.0, 16.3" 4K OLED Touch',
        rating: 4.7,
        in_stock: true,
        warranty_years: 1
      },
      {
        laptop_name: 'Lenovo ThinkPad X1 Carbon Gen 12',
        brand: 'Lenovo',
        price_usd: 1989,
        specs: 'Intel Core Ultra 7 155H, Intel Arc GPU, 32GB RAM, 1TB SSD, 14" 2.8K OLED HDR500, Carbon Fiber chassis',
        rating: 4.8,
        in_stock: false,
        warranty_years: 3
      },
      {
        laptop_name: 'ASUS ROG Zephyrus G14 Stealth',
        brand: 'ASUS',
        price_usd: 2199,
        specs: 'AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB DDR5, 1TB SSD, 14" 3K 120Hz OLED, 1.5kg chassis',
        rating: 4.8,
        in_stock: true,
        warranty_years: 1
      },
      {
        laptop_name: 'Razer Blade 16 Dual-Mode Mini-LED',
        brand: 'Razer',
        price_usd: 3799,
        specs: 'Intel Core i9-14900HX, RTX 4090 16GB, 64GB DDR5, 4TB SSD RAID, 16" Dual-Mode 4K 120Hz / FHD 240Hz',
        rating: 4.6,
        in_stock: true,
        warranty_years: 2
      }
    ],
    v1Html: `
<section class="catalog-section" data-section="laptop-inventory">
  <div class="header-container">
    <h1 class="page-title">High-Performance Laptops & Workstations (2026 Fleet)</h1>
    <span class="catalog-count">Showing 5 Flagship Models</span>
  </div>
  
  <div class="product-grid">
    <!-- Item 1 -->
    <div class="product-card" data-sku="APL-M3M-16" data-category="apple">
      <div class="badge-container"><span class="badge best-seller">Bestseller</span></div>
      <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" alt="MacBook Pro" class="thumb" />
      <h2 class="product-title">MacBook Pro 16" M3 Max</h2>
      <div class="manufacturer-tag">Apple Inc.</div>
      <div class="pricing-wrap">
        <span class="currency">$</span>
        <span class="price-current">3,499.00</span>
        <span class="price-original">$3,799.00</span>
      </div>
      <ul class="specs-list">
        <li>Apple M3 Max (16-core CPU, 40-core GPU)</li>
        <li>36GB Unified Memory</li>
        <li>1TB Ultrafast NVMe SSD</li>
        <li>16.2" Liquid Retina XDR 120Hz ProMotion</li>
      </ul>
      <div class="meta-row">
        <span class="rating-score">★ 4.9 (412 reviews)</span>
        <span class="stock-status in-stock">Ready to Ship</span>
      </div>
    </div>

    <!-- Item 2 -->
    <div class="product-card" data-sku="DEL-X16-ULT" data-category="dell">
      <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80" alt="Dell XPS" class="thumb" />
      <h2 class="product-title">Dell XPS 16 OLED Titanium</h2>
      <div class="manufacturer-tag">Dell Technologies</div>
      <div class="pricing-wrap">
        <span class="currency">$</span>
        <span class="price-current">2,699.00</span>
      </div>
      <ul class="specs-list">
        <li>Intel Core Ultra 9 185H with NPU AI Boost</li>
        <li>NVIDIA GeForce RTX 4070 8GB</li>
        <li>32GB LPDDR5X 7467MHz</li>
        <li>16.3" 4K OLED Touch InfinityEdge</li>
      </ul>
      <div class="meta-row">
        <span class="rating-score">★ 4.7 (189 reviews)</span>
        <span class="stock-status in-stock">3 units left</span>
      </div>
    </div>

    <!-- Item 3 -->
    <div class="product-card" data-sku="LEN-X1C-G12" data-category="lenovo">
      <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80" alt="Lenovo ThinkPad" class="thumb" />
      <h2 class="product-title">Lenovo ThinkPad X1 Carbon Gen 12</h2>
      <div class="manufacturer-tag">Lenovo</div>
      <div class="pricing-wrap">
        <span class="currency">$</span>
        <span class="price-current">1,989.00</span>
        <span class="price-original">$2,299.00</span>
      </div>
      <ul class="specs-list">
        <li>Intel Core Ultra 7 155H 16-Core</li>
        <li>Intel Arc Graphics</li>
        <li>32GB LPDDR5X RAM</li>
        <li>14" 2.8K OLED HDR500 Display, Carbon Fiber body</li>
      </ul>
      <div class="meta-row">
        <span class="rating-score">★ 4.8 (305 reviews)</span>
        <span class="stock-status out-of-stock">Backorder Available</span>
      </div>
    </div>

    <!-- Item 4 -->
    <div class="product-card" data-sku="ASU-G14-2026" data-category="asus">
      <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80" alt="ASUS ROG" class="thumb" />
      <h2 class="product-title">ASUS ROG Zephyrus G14 Stealth</h2>
      <div class="manufacturer-tag">ASUS ROG</div>
      <div class="pricing-wrap">
        <span class="currency">$</span>
        <span class="price-current">2,199.00</span>
      </div>
      <ul class="specs-list">
        <li>AMD Ryzen 9 8945HS with Ryzen AI</li>
        <li>NVIDIA RTX 4070 8GB GDDR6</li>
        <li>32GB DDR5 5600MHz RAM</li>
        <li>14" 3K 120Hz OLED 0.2ms Display, 1.5kg</li>
      </ul>
      <div class="meta-row">
        <span class="rating-score">★ 4.8 (520 reviews)</span>
        <span class="stock-status in-stock">Ready to Ship</span>
      </div>
    </div>

    <!-- Item 5 -->
    <div class="product-card" data-sku="RZR-BLD-16" data-category="razer">
      <div class="badge-container"><span class="badge premium">Pro Tier</span></div>
      <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80" alt="Razer Blade" class="thumb" />
      <h2 class="product-title">Razer Blade 16 Dual-Mode Mini-LED</h2>
      <div class="manufacturer-tag">Razer Inc.</div>
      <div class="pricing-wrap">
        <span class="currency">$</span>
        <span class="price-current">3,799.00</span>
      </div>
      <ul class="specs-list">
        <li>Intel Core i9-14900HX 24-Core</li>
        <li>NVIDIA GeForce RTX 4090 16GB</li>
        <li>64GB Dual-Channel DDR5 5600MHz</li>
        <li>16" Dual-Mode Mini-LED (4K 120Hz & FHD 240Hz)</li>
      </ul>
      <div class="meta-row">
        <span class="rating-score">★ 4.6 (94 reviews)</span>
        <span class="stock-status in-stock">Immediate Dispatch</span>
      </div>
    </div>
  </div>
</section>
    `,
    v2Html: `
<!-- REVAMPED V2 LAYOUT (Complete HTML rewrite: classes randomized, tags altered, structure shifted) -->
<main class="v2-inventory-wrapper" id="storefront-v2">
  <header class="hero-bar flex justify-between">
    <h1 class="headline-primary font-bold">Flagship Ultrabooks & Creator Rigs 2026</h1>
    <div class="status-indicator">Verified Live Stock</div>
  </header>

  <div class="device-catalog-grid grid grid-cols-3 gap-6">
    <!-- Item 1 - Classes completely altered -->
    <article class="catalog-item_v2 relative rounded-2xl border" data-entity-id="APL-M3M-16">
      <div class="visual-wrapper"><img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" class="device-img"/></div>
      <div class="details-body p-4">
        <span class="vendor-label text-xs uppercase tracking-wide">Apple Inc.</span>
        <h3 class="item-heading text-lg font-semibold text-slate-900">MacBook Pro 16" M3 Max</h3>
        <div class="cost-badge bg-emerald-50 text-emerald-800 font-mono py-1 px-2.5 rounded-lg">
          <span class="cur">$</span><span class="val font-black">3,499.00</span>
          <span class="msrp text-xs line-through text-slate-400 ml-1">$3,799.00</span>
        </div>
        <dl class="specs-grid mt-3 text-sm text-slate-600">
          <dt class="sr-only">Specifications</dt>
          <dd class="spec-pill">Apple M3 Max (16-core CPU, 40-core GPU)</dd>
          <dd class="spec-pill">36GB Unified Memory</dd>
          <dd class="spec-pill">1TB Ultrafast NVMe SSD</dd>
          <dd class="spec-pill">16.2" Liquid Retina XDR 120Hz ProMotion</dd>
        </dl>
        <footer class="item-footer flex items-center justify-between mt-4 pt-3 border-t">
          <div class="customer-sentiment text-amber-500 font-medium">★ 4.9 (412 ratings)</div>
          <div class="inventory-status font-semibold text-emerald-600">In Stock (Next-Day Air)</div>
        </footer>
      </div>
    </article>

    <!-- Item 2 -->
    <article class="catalog-item_v2 relative rounded-2xl border" data-entity-id="DEL-X16-ULT">
      <div class="visual-wrapper"><img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80" class="device-img"/></div>
      <div class="details-body p-4">
        <span class="vendor-label text-xs uppercase tracking-wide">Dell Technologies</span>
        <h3 class="item-heading text-lg font-semibold text-slate-900">Dell XPS 16 OLED Titanium</h3>
        <div class="cost-badge bg-emerald-50 text-emerald-800 font-mono py-1 px-2.5 rounded-lg">
          <span class="cur">$</span><span class="val font-black">2,699.00</span>
        </div>
        <dl class="specs-grid mt-3 text-sm text-slate-600">
          <dt class="sr-only">Specifications</dt>
          <dd class="spec-pill">Intel Core Ultra 9 185H with NPU AI Boost</dd>
          <dd class="spec-pill">NVIDIA GeForce RTX 4070 8GB</dd>
          <dd class="spec-pill">32GB LPDDR5X 7467MHz</dd>
          <dd class="spec-pill">16.3" 4K OLED Touch InfinityEdge</dd>
        </dl>
        <footer class="item-footer flex items-center justify-between mt-4 pt-3 border-t">
          <div class="customer-sentiment text-amber-500 font-medium">★ 4.7 (189 ratings)</div>
          <div class="inventory-status font-semibold text-emerald-600">In Stock (3 Left)</div>
        </footer>
      </div>
    </article>

    <!-- Item 3 -->
    <article class="catalog-item_v2 relative rounded-2xl border" data-entity-id="LEN-X1C-G12">
      <div class="visual-wrapper"><img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80" class="device-img"/></div>
      <div class="details-body p-4">
        <span class="vendor-label text-xs uppercase tracking-wide">Lenovo</span>
        <h3 class="item-heading text-lg font-semibold text-slate-900">Lenovo ThinkPad X1 Carbon Gen 12</h3>
        <div class="cost-badge bg-emerald-50 text-emerald-800 font-mono py-1 px-2.5 rounded-lg">
          <span class="cur">$</span><span class="val font-black">1,989.00</span>
          <span class="msrp text-xs line-through text-slate-400 ml-1">$2,299.00</span>
        </div>
        <dl class="specs-grid mt-3 text-sm text-slate-600">
          <dt class="sr-only">Specifications</dt>
          <dd class="spec-pill">Intel Core Ultra 7 155H 16-Core</dd>
          <dd class="spec-pill">Intel Arc Graphics</dd>
          <dd class="spec-pill">32GB LPDDR5X RAM</dd>
          <dd class="spec-pill">14" 2.8K OLED HDR500 Display, Carbon Fiber body</dd>
        </dl>
        <footer class="item-footer flex items-center justify-between mt-4 pt-3 border-t">
          <div class="customer-sentiment text-amber-500 font-medium">★ 4.8 (305 ratings)</div>
          <div class="inventory-status font-semibold text-rose-500">Out of Stock (Backorder)</div>
        </footer>
      </div>
    </article>

    <!-- Item 4 -->
    <article class="catalog-item_v2 relative rounded-2xl border" data-entity-id="ASU-G14-2026">
      <div class="visual-wrapper"><img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80" class="device-img"/></div>
      <div class="details-body p-4">
        <span class="vendor-label text-xs uppercase tracking-wide">ASUS ROG</span>
        <h3 class="item-heading text-lg font-semibold text-slate-900">ASUS ROG Zephyrus G14 Stealth</h3>
        <div class="cost-badge bg-emerald-50 text-emerald-800 font-mono py-1 px-2.5 rounded-lg">
          <span class="cur">$</span><span class="val font-black">2,199.00</span>
        </div>
        <dl class="specs-grid mt-3 text-sm text-slate-600">
          <dt class="sr-only">Specifications</dt>
          <dd class="spec-pill">AMD Ryzen 9 8945HS with Ryzen AI</dd>
          <dd class="spec-pill">NVIDIA RTX 4070 8GB GDDR6</dd>
          <dd class="spec-pill">32GB DDR5 5600MHz RAM</dd>
          <dd class="spec-pill">14" 3K 120Hz OLED 0.2ms Display, 1.5kg</dd>
        </dl>
        <footer class="item-footer flex items-center justify-between mt-4 pt-3 border-t">
          <div class="customer-sentiment text-amber-500 font-medium">★ 4.8 (520 ratings)</div>
          <div class="inventory-status font-semibold text-emerald-600">In Stock</div>
        </footer>
      </div>
    </article>

    <!-- Item 5 -->
    <article class="catalog-item_v2 relative rounded-2xl border" data-entity-id="RZR-BLD-16">
      <div class="visual-wrapper"><img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80" class="device-img"/></div>
      <div class="details-body p-4">
        <span class="vendor-label text-xs uppercase tracking-wide">Razer Inc.</span>
        <h3 class="item-heading text-lg font-semibold text-slate-900">Razer Blade 16 Dual-Mode Mini-LED</h3>
        <div class="cost-badge bg-emerald-50 text-emerald-800 font-mono py-1 px-2.5 rounded-lg">
          <span class="cur">$</span><span class="val font-black">3,799.00</span>
        </div>
        <dl class="specs-grid mt-3 text-sm text-slate-600">
          <dt class="sr-only">Specifications</dt>
          <dd class="spec-pill">Intel Core i9-14900HX 24-Core</dd>
          <dd class="spec-pill">NVIDIA GeForce RTX 4090 16GB</dd>
          <dd class="spec-pill">64GB Dual-Channel DDR5 5600MHz</dd>
          <dd class="spec-pill">16" Dual-Mode Mini-LED (4K 120Hz & FHD 240Hz)</dd>
        </dl>
        <footer class="item-footer flex items-center justify-between mt-4 pt-3 border-t">
          <div class="customer-sentiment text-amber-500 font-medium">★ 4.6 (94 ratings)</div>
          <div class="inventory-status font-semibold text-emerald-600">In Stock (Dispatched in 2h)</div>
        </footer>
      </div>
    </article>
  </div>
</main>
    `
  },
  {
    id: 'tech-jobs-portal',
    title: 'RemoteDev Global - AI & Cloud Engineering Jobs',
    category: 'Job Listings & Recruiting',
    icon: 'Briefcase',
    description: 'Extract tech job openings, companies, salary ranges, required tech stack, and remote flexibility.',
    defaultPrompt: 'Extract all software engineering job roles with company name, salary range, tech stack requirements, location type (Remote/Hybrid), and application deadline into clean JSON.',
    sourceUrl: 'https://remotedev-careers.tech/jobs/ai-infrastructure',
    traditionalSelectors: {
      item: 'li.job-listing-row',
      title: 'span.job-title-link',
      company: 'span.company-name',
      salary: 'div.salary-tag',
      tags: 'div.tag-pill'
    },
    sampleRecords: [
      {
        job_title: 'Senior AI Infrastructure Engineer',
        company: 'HyperScale AI',
        salary_range: '$180,000 - $240,000 / yr',
        location: 'Remote (Worldwide)',
        tech_stack: ['PyTorch', 'Kubernetes', 'Triton', 'vLLM', 'Rust'],
        experience_level: 'Senior / Staff',
        remote: true
      },
      {
        job_title: 'Lead Full-Stack Agent Architect',
        company: 'CognitiveOS',
        salary_range: '$190,000 - $260,000 / yr + 0.5% Equity',
        location: 'Remote (US/EU Timezones)',
        tech_stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'LangGraph', 'Tailwind'],
        experience_level: 'Principal',
        remote: true
      },
      {
        job_title: 'Cloud Distributed Systems Engineer',
        company: 'NovaCore Labs',
        salary_range: '$165,000 - $210,000 / yr',
        location: 'Hybrid (San Francisco or Remote)',
        tech_stack: ['Go', 'Kafka', 'gRPC', 'AWS ECS', 'Terraform'],
        experience_level: 'Mid to Senior',
        remote: false
      },
      {
        job_title: 'Machine Learning Pipeline Developer',
        company: 'Synthetica Data',
        salary_range: '$150,000 - $195,000 / yr',
        location: 'Remote (Americas)',
        tech_stack: ['Python', 'Ray', 'DuckDB', 'FastAPI', 'Docker'],
        experience_level: 'Senior',
        remote: true
      }
    ],
    v1Html: `
<div class="job-board-container">
  <div class="board-header">
    <h2>Verified High-Impact AI & Systems Positions</h2>
    <p>4 open postings match your criteria</p>
  </div>
  <ul class="job-list">
    <li class="job-listing-row" data-id="job-901">
      <div class="role-info">
        <span class="job-title-link">Senior AI Infrastructure Engineer</span>
        <span class="company-name">HyperScale AI</span>
      </div>
      <div class="salary-tag">$180,000 - $240,000 / yr</div>
      <div class="work-mode">Remote (Worldwide)</div>
      <div class="tags-container">
        <span class="tag-pill">PyTorch</span>
        <span class="tag-pill">Kubernetes</span>
        <span class="tag-pill">Triton</span>
        <span class="tag-pill">vLLM</span>
        <span class="tag-pill">Rust</span>
      </div>
      <div class="meta-info">Experience: Senior / Staff</div>
    </li>
    <li class="job-listing-row" data-id="job-902">
      <div class="role-info">
        <span class="job-title-link">Lead Full-Stack Agent Architect</span>
        <span class="company-name">CognitiveOS</span>
      </div>
      <div class="salary-tag">$190,000 - $260,000 / yr + 0.5% Equity</div>
      <div class="work-mode">Remote (US/EU Timezones)</div>
      <div class="tags-container">
        <span class="tag-pill">TypeScript</span>
        <span class="tag-pill">Next.js</span>
        <span class="tag-pill">PostgreSQL</span>
        <span class="tag-pill">LangGraph</span>
      </div>
      <div class="meta-info">Experience: Principal</div>
    </li>
    <li class="job-listing-row" data-id="job-903">
      <div class="role-info">
        <span class="job-title-link">Cloud Distributed Systems Engineer</span>
        <span class="company-name">NovaCore Labs</span>
      </div>
      <div class="salary-tag">$165,000 - $210,000 / yr</div>
      <div class="work-mode">Hybrid (San Francisco or Remote)</div>
      <div class="tags-container">
        <span class="tag-pill">Go</span>
        <span class="tag-pill">Kafka</span>
        <span class="tag-pill">gRPC</span>
        <span class="tag-pill">Terraform</span>
      </div>
      <div class="meta-info">Experience: Mid to Senior</div>
    </li>
    <li class="job-listing-row" data-id="job-904">
      <div class="role-info">
        <span class="job-title-link">Machine Learning Pipeline Developer</span>
        <span class="company-name">Synthetica Data</span>
      </div>
      <div class="salary-tag">$150,000 - $195,000 / yr</div>
      <div class="work-mode">Remote (Americas)</div>
      <div class="tags-container">
        <span class="tag-pill">Python</span>
        <span class="tag-pill">Ray</span>
        <span class="tag-pill">DuckDB</span>
        <span class="tag-pill">FastAPI</span>
      </div>
      <div class="meta-info">Experience: Senior</div>
    </li>
  </ul>
</div>
    `,
    v2Html: `
<section class="careers-feed-v2">
  <div class="careers-stream-cards flex flex-col gap-4">
    <div class="posting-card-wrapper border rounded-xl p-5" data-listing="901">
      <div class="header-band flex justify-between">
        <div>
          <h4 class="position-designation text-xl font-bold">Senior AI Infrastructure Engineer</h4>
          <span class="employer-badge font-medium text-indigo-600">HyperScale AI</span>
        </div>
        <div class="compensation-box bg-slate-100 rounded px-3 py-1 font-mono text-sm">$180,000 - $240,000 / yr</div>
      </div>
      <div class="flex gap-2 items-center text-sm text-slate-500 mt-2">
        <span class="geo-badge">Remote (Worldwide)</span> • <span class="seniority">Senior / Staff</span>
      </div>
      <div class="skills-array flex flex-wrap gap-1.5 mt-3">
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">PyTorch</span>
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">Kubernetes</span>
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">Triton</span>
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">vLLM</span>
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">Rust</span>
      </div>
    </div>
    <!-- more transformed postings -->
    <div class="posting-card-wrapper border rounded-xl p-5" data-listing="902">
      <div class="header-band flex justify-between">
        <div>
          <h4 class="position-designation text-xl font-bold">Lead Full-Stack Agent Architect</h4>
          <span class="employer-badge font-medium text-indigo-600">CognitiveOS</span>
        </div>
        <div class="compensation-box bg-slate-100 rounded px-3 py-1 font-mono text-sm">$190,000 - $260,000 / yr + 0.5% Equity</div>
      </div>
      <div class="flex gap-2 items-center text-sm text-slate-500 mt-2">
        <span class="geo-badge">Remote (US/EU Timezones)</span> • <span class="seniority">Principal</span>
      </div>
      <div class="skills-array flex flex-wrap gap-1.5 mt-3">
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">TypeScript</span>
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">Next.js</span>
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">PostgreSQL</span>
        <span class="skill-bubble bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">LangGraph</span>
      </div>
    </div>
  </div>
</section>
    `
  },
  {
    id: 'real-estate-properties',
    title: 'MetroLux Premier Real Estate',
    category: 'Real Estate & Rentals',
    icon: 'Home',
    description: 'Extract property listings, monthly rents, bedroom/bathroom layouts, square footage, and key amenities.',
    defaultPrompt: 'Extract all rental listings with property title, monthly price, address/neighborhood, bed/bath count, square footage, and amenities list.',
    sourceUrl: 'https://metrolux-properties.estate/rentals/downtown',
    traditionalSelectors: {
      item: '.listing-item',
      title: '.listing-name',
      price: '.monthly-rent',
      address: '.property-address',
      specs: '.spec-item'
    },
    sampleRecords: [
      {
        title: 'The Skyview Penthouse at Hudson Yards',
        monthly_rent: '$9,200',
        address: '520 W 30th St, New York, NY 10001',
        beds: 3,
        baths: 3.5,
        sqft: 2450,
        amenities: ['Private Terrace', '24/7 Doorman', 'Infinity Pool', 'Valet Parking', 'Smart Home Integration']
      },
      {
        title: 'Modern Minimalist Loft in SoHo',
        monthly_rent: '$6,800',
        address: '114 Mercer St, New York, NY 10012',
        beds: 2,
        baths: 2,
        sqft: 1820,
        amenities: ['Cast Iron Beams', 'Sub-Zero Appliances', 'In-Unit Washer/Dryer', 'Wine Cellar']
      },
      {
        title: 'Waterfront Brownstone Duplex',
        monthly_rent: '$7,400',
        address: '88 Columbia Heights, Brooklyn, NY 11201',
        beds: 3,
        baths: 2.5,
        sqft: 2100,
        amenities: ['Private Garden', 'Fireplace', 'Historic Details', 'Panoramic Harbor Views']
      }
    ],
    v1Html: `
<div class="estate-catalog">
  <div class="listing-item" data-unit="unit-01">
    <h3 class="listing-name">The Skyview Penthouse at Hudson Yards</h3>
    <span class="monthly-rent">$9,200 / month</span>
    <p class="property-address">520 W 30th St, New York, NY 10001</p>
    <div class="specs-row">
      <span class="spec-item">3 Beds</span> | <span class="spec-item">3.5 Baths</span> | <span class="spec-item">2,450 sqft</span>
    </div>
    <div class="amenities-summary">Private Terrace, 24/7 Doorman, Infinity Pool, Valet Parking, Smart Home Integration</div>
  </div>
  <div class="listing-item" data-unit="unit-02">
    <h3 class="listing-name">Modern Minimalist Loft in SoHo</h3>
    <span class="monthly-rent">$6,800 / month</span>
    <p class="property-address">114 Mercer St, New York, NY 10012</p>
    <div class="specs-row">
      <span class="spec-item">2 Beds</span> | <span class="spec-item">2 Baths</span> | <span class="spec-item">1,820 sqft</span>
    </div>
    <div class="amenities-summary">Cast Iron Beams, Sub-Zero Appliances, In-Unit Washer/Dryer, Wine Cellar</div>
  </div>
</div>
    `,
    v2Html: `
<section class="estates-v2">
  <article class="property-card-mod shadow-sm border p-4 mb-4">
    <div class="meta-top flex justify-between">
      <h2 class="residence-title text-xl font-bold">The Skyview Penthouse at Hudson Yards</h2>
      <div class="rate-badge text-green-700 font-bold">$9,200 / month</div>
    </div>
    <div class="location-pin text-gray-500 text-sm">520 W 30th St, New York, NY 10001</div>
    <ul class="dimension-chips flex gap-3 my-2 text-sm">
      <li>3 Beds</li>
      <li>3.5 Baths</li>
      <li>2,450 sqft</li>
    </ul>
    <p class="perks text-xs text-gray-600">Private Terrace, 24/7 Doorman, Infinity Pool, Valet Parking, Smart Home Integration</p>
  </article>
</section>
    `
  }
];
