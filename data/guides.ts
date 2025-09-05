export interface Guide {
    slug: string;
    title: string;
    description: string;
    category: string;
    content: string;
  }
  
  export const guides: Guide[] = [
    {
      slug: 'pre-orientation-camp-checklist',
      title: 'The Ultimate Pre-Orientation Camp Checklist',
      description: 'Everything you need to pack and prepare for the 3-week orientation camp. Dont leave anything essential behind!',
      category: 'Pre-Camp',
      content: `
        <h2 class="text-2xl font-bold mb-4">Introduction</h2>
        <p class="mb-4">Getting ready for the NYSC orientation camp can be both exciting and overwhelming. This checklist will ensure you have everything you need for a smooth and comfortable 3-week experience.</p>
        
        <h3 class="text-xl font-bold mb-2">Essential Documents (Do NOT Forget!)</h3>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li>Call-Up Letter (Original + 6 photocopies)</li>
          <li>Statement of Result/Certificate (Original + 4 photocopies)</li>
          <li>School ID Card (Original + 4 photocopies)</li>
          <li>Passport Photographs (8-10 copies, white background)</li>
          <li>Medical Certificate of Fitness (Original + 2 photocopies)</li>
          <li>Green Card (Original + 4 photocopies)</li>
        </ul>
  
        <h3 class="text-xl font-bold mb-2">Camp Essentials (White on White)</h3>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li>White T-shirts (at least 4-5)</li>
          <li>White Shorts (at least 2-3 pairs)</li>
          <li>White Tennis Shoes (1 pair)</li>
          <li>White Socks (at least 3 pairs)</li>
        </ul>
  
        <h3 class="text-xl font-bold mb-2">Personal Items</li>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li>Bed sheets, Pillow, Pillowcase</li>
          <li>Mosquito Net</li>
          <li>Towel</li>
          <li>Toiletries (soap, sponge, toothbrush, toothpaste, etc.)</li>
          <li>Antiseptic (like Dettol)</li>
          <li>Padlocks for your bags</li>
          <li>Waist pouch or small bag for valuables</li>
          <li>Power bank and charger</li>
          <li>Torchlight</li>
          <li>Basic medication (e.g., pain relievers, allergy meds)</li>
        </ul>
  
        <h3 class="text-xl font-bold mb-2">Money</h3>
        <p class="mb-4">While you will be fed in camp, you'll need money for other things like charging your phone, buying snacks from the "Mami Market", and laundry. It's wise to have a mix of cash and your ATM card.</p>
      `
    },
    {
      slug: 'surviving-ppa-posting',
      title: 'How to Survive and Thrive After Your PPA Posting',
      description: 'Got your PPA letter? Heres what to do next to settle in quickly and make a great first impression.',
      category: 'Post-Camp',
      content: `
        <h2 class="text-2xl font-bold mb-4">You've Got Your PPA! Now What?</h2>
        <p class="mb-4">The post-camp period is crucial. Your actions in the first few weeks at your Place of Primary Assignment (PPA) can set the tone for your entire service year.</p>
        
        <h3 class="text-xl font-bold mb-2">Step 1: Report to Your PPA Immediately</h3>
        <p class="mb-4">Don't delay. Head to your PPA as soon as you leave camp. This shows you are serious and responsible. Get your posting letter stamped and signed by the appropriate authority.</p>
  
        <h3 class="text-xl font-bold mb-2">Step 2: Find Temporary Accommodation</h3>
        <p class="mb-4">If your PPA doesn't provide accommodation, your first priority is finding a place to stay. Ask local corps members, church/mosque members, or your PPA for help. Religious organizations like NCCF (Nigeria Christian Corpers' Fellowship) or MCAN (Muslim Corpers' Association of Nigeria) often provide temporary lodging.</p>
  
        <h3 class="text-xl font-bold mb-2">Step 3: Understand Your Role</h3>
        <p class="mb-4">Have a clear conversation with your supervisor about your duties and responsibilities. Understand the work culture, dress code, and reporting times.</p>
  
        <h3 class="text-xl font-bold mb-2">Step 4: Connect with Other Corps Members</h3>
        <p class="mb-4">Find the local Community Development Service (CDS) group and connect with other corps members. They are your support system and can provide invaluable local knowledge.</p>
      `
    },
    {
      slug: 'cds-groups-explained',
      title: 'Understanding Community Development Service (CDS) Groups',
      description: 'CDS is a mandatory part of NYSC. Learn what it is, why it matters, and how to choose the right group for you.',
      category: 'Service Year',
      content: `
        <h2 class="text-2xl font-bold mb-4">What is CDS?</h2>
        <p class="mb-4">Community Development Service (CDS) is one of the four cardinal programs of the NYSC. It's a platform for corps members to contribute to the development of their host communities.</p>
        
        <h3 class="text-xl font-bold mb-2">Types of CDS Groups</h3>
        <p class="mb-4">There are two main types of CDS groups:</p>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li><strong>Group CDS:</strong> These are general groups that all corps members belong to, usually based on their PPA.</li>
          <li><strong>Personal/Group Projects:</strong> These are specific projects initiated by a corps member or a group of corps members to address a particular need in the community.</li>
        </ul>
  
        <h3 class="text-xl font-bold mb-2">Popular CDS Groups</h3>
        <p class="mb-4">Some popular and impactful CDS groups include:</p>
        <ul class="list-disc list-inside mb-4 pl-4">
          <li>Road Safety Club</li>
          <li>Medical and Health Services</li>
          <li>Editorial/Publicity</li>
          <li>Anti-Corruption (EFCC)</li>
          <li>Drug-Free and Quality Control (NDLEA)</li>
          <li>Charity and Gender</li>
        </ul>
  
        <h3 class="text-xl font-bold mb-2">Why CDS Matters</h3>
        <p class="mb-4">CDS is not just about weekly meetings. It's an opportunity to develop leadership skills, make a tangible impact, and network. Excellent performance in CDS can even lead to state or national awards.</p>
      `
    }
  ];
  